# Non-Profit Volunteer Tracking Web Interface With SMS & Social Media

> Request and retain vounteer hours while allowing volunteers to humblebrag their service over Facebook

##### The Problem:

- Volunteer based non-profits struggle to collect volunteer hours for reporting and fundraising purposes.

##### The Solution:

- Our app will enable simple automated data collection by sending volunteers sms messages on a weekly or monthly basis requesting the volunteer to respond with their volunteer hours.

- After responding with their hours, volunteers will have the option to post their hours on Facebook which will increase awareness for the non-profit.

------

##### Design:

- The app will include two interfaces:

    1. **The non-profit facing app** that allows input of known volunteers and their phone numbers, handle opt-in for sms messaging, and access the collected data.

    1. **The volunteer facing app** that allows volunteers to opt-in or out of sms messaging, view their hours, and share their hours over facebook.

##### APIs:

- Plivo
- Facebook

#### Technologies:

- Node.js for receiving messages
- Heroku for hosting Node server
- Firebase for data collection
- Plivo helper library
- Ajax

----

###### Future Extensions:

- Integration of multiple non-profits
- Integration of additional social media channels
- Integrate data with additional APIs on the non-profit facing side for easy reporting


