// This file contains functions to put, get, update and delete data from the AWS S3 bucket
const AWS = require("aws-sdk");
const Keys = require("../auth/keys");
const _ = require("lodash");



// configuring the AWS environment
AWS.config.update({
    region: Keys.s3.region,
    accessKeyId: Keys.s3.keyID,
    secretAccessKey: Keys.s3.secretKey
});


// create an S3 instance
let s3 = new AWS.S3();





// This function gets the content of the file with name 'key' from the S3 bucket
async function getFile(key){
    let params = {
        Bucket: Keys.s3.bucketName,
        Key: key,
    };

    try{
        let obj = await s3.getObject(params).promise();
        return JSON.parse(obj.Body.toString("utf-8"));
    } catch(e){
        console.log(e);
        return undefined;
    }
}




  // This function writes content as a file to the S3 bucket
async function addFile(content, targetPath){
    let params = {
        Bucket: Keys.s3.bucketName,
        Body : JSON.stringify(content),
        Key : targetPath,
        ContentType: "application/json"
    };

    return await s3.upload(params).promise();
 }




  // This function deletes a file named 'key' from the S3 bucket
async function deleteFile(key){
    let params = {
        Bucket: Keys.s3.bucketName,
        Key: key
    };

    return await s3.deleteObject(params).promise();
}






async function getOneLaunch(launch){
    let rawData, analysedData, eventData;

    rawData = await getFile(launch.raw_path);
    analysedData = await getFile(launch.analysed_path);
    eventData = await getFile(launch.events_path);
    
    return {rawData: rawData,
            analysedData: analysedData,
            eventData: eventData};
}



async function addOneLaunch(launch){
    let rawPath, analysedPath, eventsPath;

    let launchMetadata = {
        mission_id: launch.mission_id,
        name: launch.name,
        flight_number: launch.flight_number
    };


    rawPath = await addFile(launch.raw, `raw-${launchMetadata.flight_number}.json`);
    analysedPath = await addFile(launch.analysed, `analysed-${launchMetadata.flight_number}.json`);
    eventsPath = await addFile(launch.events, `events-${launchMetadata.flight_number}.json`);

    if (rawPath)
        launchMetadata.raw_path = rawPath.key;
    if (analysedPath)
        launchMetadata.analysed_path = analysedPath.key;
    if (eventsPath)
        launchMetadata.events_path = eventsPath.key;

    return launchMetadata;
}


async function deleteOneLaunch(launch){
    return (!launch.raw_path || !_.isEmpty(await deleteFile(launch.raw_path))) &&
            (!launch.analysed_path || !_.isEmpty(await deleteFile(launch.analysed_path))) &&
            (!launch.events_path || !_.isEmpty(await deleteFile(launch.events_path)));
}


async function updateOneLaunch(launch){
    if (deleteOneLaunch(launch))
        return addOneLaunch(launch);

    return undefined;
}



module.exports = {
    getFile: getFile,
    getOneLaunch: getOneLaunch,
    addOneLaunch: addOneLaunch,
    updateOneLaunch: updateOneLaunch,
    deleteOneLaunch: deleteOneLaunch
};
