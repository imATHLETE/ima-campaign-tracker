# IMA Campaign Tracker

Easily track campaign click-throughs from your site through the imAthlete registration flow

  - Currently only supports html anchors using the href attribute for navigation to imAthlete registration page

To use the campaign tracker you must include the *campaign* and *src* query string parameters in all links in your campaign that target your site. For example:

```sh
http://www.yourcompany.com?campaign=<your_campaign_name&src=<your_unique_id>
```

The tracking script will read the *campaign* and *src* params on the initial request into your site and store them in a cookie. Each time a page is visited in your site during that session, the script will scan the page for any links into the imAthlete registration flow (see prerequisites) and will bind the tracking info to them.

### Prerequisites

In order for the ima-campaign-tracker script to work you must make sure that all html links pointing to imAthlete.com have the 'ima-reg-link' classname included in the anchor tag's class attribute. For example:

```sh
<a class="ima-reg-link" href="www.imathlete.com/...">Register</a>
```


### Usage
Either add a reference to the *ima-campaign-tracker.min.js" script or embed the contents of the file at the end of each page you want the script to run on (or on a root template if you have one). If you need to rebind after rendering dynamic content you can call $ima.campaignTracker.bind() to refresh the bindings after the new content is loaded.

