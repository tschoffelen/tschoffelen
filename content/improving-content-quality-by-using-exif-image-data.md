---
title: Improving Content Quality by Using EXIF Image Data
description: Last week, we implemented some functionality in Street Art Cities
  where we’re reading the EXIF metadata from JPEG files uploaded to the…
date: 2023-07-23T17:21:55.088Z
taxonomies:
  category:
    - Blog
extra: {}
---
Last week, we implemented some functionality in [Street Art Cities](https://streetartcities.com) where we're reading the [EXIF metadata](https://en.wikipedia.org/wiki/Exif) from JPEG files uploaded to the site as artwork images.

There's a ton of data stored in these EXIF tags:

```js
{
  ImageWidth: 3024,
  ImageHeight: 4032,
  BitsPerSample: [ 8, 8, 8 ],
  Make: 'Apple',
  Model: 'iPhone 13 Pro Max',
  Orientation: 1,
  Software: 'Adobe Photoshop CC 2017 (Windows)',
  ModifyDate: 1662935648,
  HostComputer: 'iPhone 13 Pro Max',
  GPSLatitude: 37.336397222222224,
  GPSLongitude: -6.141138888888889,
  GPSAltitude: 85.13658340048349,
  GPSSpeed: 0,
  GPSImgDirection: 359.33694474539544,
  GPSDestBearing: 359.33694474539544,
  FNumber: 1.5,
  ISO: 400,
  CreateDate: 1662929078,
  ShutterSpeedValue: 5.914499196065449,
  ApertureValue: 1.1699250021066825,
  BrightnessValue: 1.1164363545276166,
  SubjectArea: [ 1913, 1498, 489, 483 ],
  ColorSpace: 65535,
  SensingMethod: 2,
  ExposureMode: 0,
  WhiteBalance: 0,
  FocalLengthIn35mmFormat: 26,
  LensInfo: [ 1.5700000524639703, 9, 1.5, 2.8 ],
  LensMake: 'Apple',
  LensModel: 'iPhone 13 Pro Max back triple camera 5.7mm f/1.5'
}
```

A comprehensive list of EXIF metadata tags can be found [on the website of exiftool](https://exiftool.org/TagNames/EXIF.html#Flash), a command line tool to parse this data.

Beyond being able to show all the artwork images captures by a [specific type of camera](https://streetartcities.com/tags/camera_used/Nikon%20D3), a lot of these also contain GPS data.

After saving the exif data for a large sample of the artworks on Street Art Cities in the database (using the Javascript library [`exif-parser`](https://www.npmjs.com/package/exif-parser)), I was able to compare the geolocation of an artwork with the geolocation of the pictures, and feed back any results that are off significantly back to our team of hunters and moderators to double check.

Here's an example of an artwork with around 611m of space between the location where the picture was taken and the location selected on the site.

![](https://schof.link/yTOjhF1)

Looking at the satellite view of this map makes it clear that the water visible [in the picture](https://streetartcities.com/markers/1697) is certainly closer to the GPS location in the image metadata than the original location that was selected on the website.

This is a great way to give our community additional tools to improve data quality, without having to do additional work to input information.