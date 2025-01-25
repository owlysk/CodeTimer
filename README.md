# CodeTimer
Timer Widget for Kimai Time Tracking

---

This is a tiny application widget for Kimai Time Tracking like Clockify has. You have to install Kimai Time Tracking and setup API for using this widget.

As backend is using Neutralino.js. For minimal API request app is using built in cache. Cache is valid for 1 hour and stores activities and projects from Kimai. If you add new activity/project, you might refresh cache in setting (is located next to back button)
  
I was using Clockify app, but i decide to install Kimai for reason that data is stored at my server. Kimai has not own widget like Clockify do, but has free API. I decided to make simple small app for myself and publish it for someone, who use Clockify and has similiar issue about data storing.

If you enjoy my app, I appreciate if you buy me a coffee :)  
<a href="https://www.buymeacoffee.com/owlysk" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="41" width="174"></a>

### Android app
You can find Android app on [GitHub](https://github.com/owlysk/CodeTimer-Mobile) or [Google Play](https://play.google.com/store/apps/details?id=sk.owly.codetimermobile)  
<a href="https://play.google.com/store/apps/details?id=sk.owly.codetimermobile" target="_blank"><img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Google Play" width="250" /></a>

### Screenshots
<a href="https://owly.sk/apps/CodeTimer/screen/screen1.png" target="_blank">
<img src="https://owly.sk/apps/CodeTimer/screen/screen1.png" alt="Screen1" height="" width="174">
</a>

<a href="https://owly.sk/apps/CodeTimer/screen/screen2.png" target="_blank">
<img src="https://owly.sk/apps/CodeTimer/screen/screen2.png" alt="Screen2" height="" width="174">
</a>

<a href="https://owly.sk/apps/CodeTimer/screen/screen3.png" target="_blank">
<img src="https://owly.sk/apps/CodeTimer/screen/screen3.png" alt="Screen3" height="" width="174">
</a>

### Video
[Watch video](https://owly.sk/apps/CodeTimer/video/codetimer.mp4)

### Kimai demo

You can try CodeTimer with Kimai [DEMO](https://www.kimai.org/en/demo.html):
- Host : `https://demo.kimai.org`
- Username : `john_user`
- API token :  `token_user`
- Use only token: &#9745;

### macOS users
If you are MAC os user, and you want use AppBundle version, you can download release 1.0.13 and update it in app settings to latest CodeTimer version.

## Development
### Requirements:
- Nodejs and npm
- Neutralinojs (Install using npm: `npm install -g @neutralinojs/neu`)

### Initial Setup:
Installs or updates required binaries
```
neu update
```

### Build and Run:
```
neu build
neu run
```

### Build release:
Generates `dist/CodeTimer-release.zip` containing all platform binaries
```
neu build --release
```


<!-- Matomo Image Tracker-->
<img referrerpolicy="no-referrer-when-downgrade" src="https://analytics.owly.sk/matomo.php?idsite=5&amp;rec=1" style="border:0" alt="" />
<!-- End Matomo -->
