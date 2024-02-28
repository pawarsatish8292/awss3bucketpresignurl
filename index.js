const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");
const res = require("express/lib/response");

const s3Client =new S3Client({
    region: "ap-south-1",
    credentials:{
        accessKeyId:"AKIA2H6QWK3QQDCEUZVA",
        secretAccessKey:"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"
    },
})

async function getObjectCommand(key){
    const command = new GetObjectCommand({
        Bucket: "satishprivatebucket",
        Key:key,
    })
    const url = getSignedUrl(s3Client, command);
    return url;
}

async function putObject(filename, contentType){
    const command = new PutObjectCommand({
        Bucket: "satishprivatebucket",
        Key:`upload/user-uploads/${filename}`,
        ContentType:contentType
    })
    const url = getSignedUrl(s3Client, command);
    return url;
}

async function listObjects(){
    const command = new ListObjectsV2Command({
        Bucket: "satishprivatebucket",
        Key:`/`,
    })
    const result = s3Client.send(command);
    return result;
}

(async function init(){
   // console.log("URL gor invoice (12).pdf : ",await getObjectCommand("upload/user-uploads/image-1708970554669.jpeg"));

   //console.log("URL for uploading: ",await putObject(`image-${Date.now()}.jpeg`, "image/jpeg"));

   console.log("list of object: ",await listObjects());
 
})();

