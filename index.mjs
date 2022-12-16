import puppeteer from "puppeteer";
import { Webhook, MessageBuilder } from "discord-webhook-node";
import { getMostRecent, insert } from "./db.mjs";
import { MODE, WEBHOOKS } from "./constants.mjs";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.minneapolismn.gov");

  const minneapolis = await page.evaluate(() => {
    console.log("foo");
    const snowEmergencyNode = document.querySelector(
      `div[data-id="snow-emergency"]`
    );
    return snowEmergencyNode
      ?.querySelector(".message")
      ?.querySelector(".show-for-sr")?.innerText;
  });

  await page.goto("https://www.stpaul.gov/");
  const stpaul = await page.evaluate(() => {
    const snowEmergencyText = document.querySelector(
      `.alert--snow-emergency`
    )?.innerText;
    return snowEmergencyText;
  });

  const messageString = JSON.stringify({ minneapolis, stpaul });
  const mostRecent = getMostRecent();
  console.log({ mostRecent });
  const messageHasChanged = mostRecent !== messageString;
  console.log({ messageHasChanged, messageString });

  insert(messageString);

  if (messageHasChanged) {
    const embed = new MessageBuilder()
      .setTitle("Snow Emergencies")
      .setColor("#b0d5d9")
      .setTimestamp();

    if (minneapolis) {
      embed.addField(
        "Minneapolis",
        minneapolis +
          "\n\n[See the rules](https://www.minneapolismn.gov/getting-around/snow/snow-emergencies/snow-parking-rules/)"
      );
    } else {
      embed.addField("Minneapolis", "No known emergency");
    }

    if (stpaul) {
      embed.addField(
        "St Paul",
        stpaul +
          "\n\n[See the rules](https://www.stpaul.gov/departments/public-works/street-maintenance/snow-emergency)"
      );
    } else {
      embed.addField("St Paul", "No known emergency");
    }

    if (MODE !== "local") {
      WEBHOOKS.forEach((h) => {
        const hook = new Webhook(h);
        hook.send(embed);
      });
    } else {
      console.log(JSON.stringify(embed.payload, null, 4));
    }
  }

  await browser.close();
})();
