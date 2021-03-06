Map.centerObject(mk,7) // mk is the table of CuuLong Area
var collection = ee.ImageCollection('MODIS/006/MOD09A1')
.filterBounds(mk) 

// Define dates
var iniDate = ee.Date.fromYMD(2019,5,15);
var endDate = ee.Date.fromYMD(2019,10,30);

// bands
var modisBands = ['sur_refl_b03','sur_refl_b04','sur_refl_b01','sur_refl_b02','sur_refl_b06','sur_refl_b07'];
var lsBands = ['blue','green','red','nir','swir1','swir2'];

// helper function to extract the QA bits
function getQABits(image, start, end, newName) {
    // Compute the bits we need to extract.
    var pattern = 0;
    for (var i = start; i <= end; i++) {
       pattern += Math.pow(2, i);
    }
    // Return a single band image of the extracted QA bits, giving the band
    // a new name.
    return image.select([0], [newName])
                  .bitwiseAnd(pattern)
                  .rightShift(start);
}

// A function to mask out cloudy pixels.
function maskQuality(image) {
  // Select the QA band.
  var QA = image.select('StateQA');
  // Get the internal_cloud_algorithm_flag bit.
  var internalQuality = getQABits(QA,8, 13, 'internal_quality_flag');
  // Return an image masking out cloudy areas.
  return image.updateMask(internalQuality.eq(0));
}

// create cloud free composite
var noCloud = collection.filterDate(iniDate,endDate)
                             .map(maskQuality)
                             .select(modisBands,lsBands);

// create composite with clouds 
var Cloud = collection.filterDate(iniDate,endDate)
                             .select(modisBands,lsBands);


// vis parameters
var visParams = {bands:['red','green','blue'],min:0,max:3000,gamma:1.3};

// add the cloud free composite
Map.addLayer(noCloud.median().clip(mk),visParams,'MODIS Composite');

// add the cloud composite
Map.addLayer(Cloud.median().clip(mk),visParams,'MODIS Composite clouds');


// take the mosaic
var md_mosaic = noCloud.mosaic();

// NDWI
var ndwi = md_mosaic.normalizedDifference(['nir', 'swir1']);

// define thresholds
var waterThreshold = 0.45;

// show the water areas
var ndwi_th = ndwi.gt(waterThreshold)
var myndwi = ndwi_th.updateMask(ndwi_th).clip(mk)
var ndwi_viz = {palette:"24069b"};
Map.addLayer(myndwi, ndwi_viz, 'Water');

// calculate water area
var objectArea = myndwi
.multiply(ee.Image.pixelArea())
.divide(10000)

var stats = objectArea.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: mk,
  scale: 500,
  maxPixels: 1e10
})
print(stats)

