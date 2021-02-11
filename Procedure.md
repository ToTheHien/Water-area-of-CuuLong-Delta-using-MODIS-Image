## 1. Clip the CuuLong Delta area
- Go to [GADM](https://gadm.org/data.html).
- Download the shapefile of Vietnam.
- Extract the file.
- Open the file in Qgis.
- Select the Cuu Long Delta region.

![QGIS](https://github.com/ToTheHien/Water-area-of-CuuLong-Delta-using-MODIS-Image/blob/main/images/QGIS.png)

- Save the selection as an esri shapefile.
- Go to the Assets table on **GEE Code Editor** and select table upload.
- Select all the files that just stored.
- Share the table. 

![Table](https://github.com/ToTheHien/Water-area-of-CuuLong-Delta-using-MODIS-Image/blob/main/images/Table.png)

## 2. Remove cloud from images

At the beginning, I used *LANDSAT 7* image but after testing I realize that Landsat images do not cover the Cuu Long Delta region. That the reason I consider using *MODIS* images which was available since March 2000. Besides, I also use *SENTINEL-2* in order to compare the result (available since 2015)

- Mask out cloudy pixels from MODIS image.

![Before](https://github.com/ToTheHien/Water-area-of-CuuLong-Delta-using-MODIS-Image/blob/main/images/Before.png)

![After](https://github.com/ToTheHien/Water-area-of-CuuLong-Delta-using-MODIS-Image/blob/main/images/After.png)

- The technique above is simply mask out cloud pixels by QA bits then convert the *MODIS* bands into its equivalent bands in *LANDSAT 8* in order to map the true color image RGB (B4-B3-B2).

![MODIS](https://github.com/ToTheHien/Water-area-of-CuuLong-Delta-using-MODIS-Image/blob/main/images/MODIS.png)

## 3. Take the mosaic
- Mosaicking refers to the process of spatially assembling image data sets to produce a spatially continuous image.
- *GEE* also provide median technique but the reason median is not more advance than mosaic is that median take the middle value of the data sets this lead to losing concentrated water pixel which present for those heavy rainy days.

## 4. Compute the NDWI
- Using *normalizedDifference()* function to compute Normalized Difference Water Index (NDWI) due to the formular:
NDWI = (NIR - SWIR)(NIR + SWIR)
- Define the waterThreshole = 0.45

## 5. Show the water area
- This is the result from October 2017.

![Water](https://github.com/ToTheHien/Water-area-of-CuuLong-Delta-using-MODIS-Image/blob/main/images/Water.png)

- Since the result also be affected by the cloudy condition of that month, it is clear that the water pixel - blue pixel did not insert into the cloudy region. That the reason why it is too risky to take 1 month for presenting the whole season, so I consider examine the whole wet season and dry season.

## 6. Calculate the water area
- Using *pixelArea()* and *reduceRegion()* to calculate the water area in meter square, then divide(10000) to convert it to hecta unit.
- Taking the scale = 500 to speed up the calculation, also 500 meter is the spatial resolution of *MODIS* image in NIR band and SWIR band.
- The result from *MODIS* and *SENTINEL 2* (with the same technique):

[Nov 15th, 2016 to April 15th,2017]
+ MODIS: 43662 hecta
+ SENT 2: 42719 hecta

→ This result is reasonable, but in this case I still use *MODIS* image because *SENTINEL 2* only available since 2015.

## 7. Define the dry/wet season
- Wet season: April 30th → Nov 15th
- Dry season: Nov 15th → April 15th
