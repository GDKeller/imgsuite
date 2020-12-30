const fs = require('fs');
const sharp = require('sharp');

// Global variables
let imageBufferArr: any;
let outputPath: any;
let writePath: string;



// Set processing paramters
let shouldTrim: boolean;
let shouldResize: boolean;
let resizeWidth: number;


// @ts-ignore
processFiles = function (data: any) {
    console.log(data);
    shouldTrim = data.trim;
    shouldResize = data.resize.shouldResize;
    if(shouldResize) {
        resizeWidth = data.resize.width;
    }
    readFile(data)
};






/* Read the file data into image buffer */
function readFile(data: any) {
    const imgPath = data.path;
    const imgName = data.name;

    outputPath = `${imgPath.replace(imgName, '')}`;

    console.log('File Path:', imgPath);
    console.log('File Name:', imgName);

    fs.readFile(imgPath, null, (err: any, data: any) => {
        if (err) {
            console.error(err);
        }
        imageBufferArr = data;
        // console.log(imageBufferArr);


        sharpWrite(imgPath, imgName, imageBufferArr);

    });
}

/* Process image with Sharp */
function sharpWrite(imgPath: any, imgName: any, imageBufferArr: any) {
    goSharp()
        .then((data: any) => {
            // console.log('Sharp object created');
            // console.log(data);
            if (shouldResize == true) {
                return sharpResize(data);
            } else {
                console.log('Will not resize');
                return data;
            }

        })
        .then((data:any) => {
            if (shouldTrim == true) {
                // console.log(data);
                return sharpTrim(data);
            } else {
                console.log('Will not trim');
                return data;
            }
        })
        .then((data: any) => {
            // console.log('trying to buffer');
            // console.log(data);
            return data.toBuffer();
        })
        .then((data: any) => {
            writePath = `${outputPath}${imgName}-sharped.jpg`;
            writeFile(imgPath, imgName, data)
        })


}

/* Create Sharp Object from image buffer */
const goSharp = function () {
    return new Promise((resolve, reject) => {
        let sharpObj = sharp(imageBufferArr, {failOnError: true});
        console.log('Go Sharp!');
        // console.log(sharpObj);
        resolve(sharpObj);
        // resolve(sharpObj);
        reject('Go sharp failed')
    });

};

/* Convert Sharp Object into image buffer */
const sharpBuffer = function (data: any) {
    return new Promise((resolve, reject) => {
        let theBuffer = data.toBuffer();
        resolve(theBuffer);
        reject('oops buffer broke');
    });
};

/* Sharp - trim "boring" pixels */
const sharpTrim = function (data: any) {
    return new Promise((resolve, reject) => {
        resolve(data.trim());
        reject('Promise rejected')
    });
};

/* Sharp - resize image */
const sharpResize = function (data: any) {
    return new Promise((resolve, reject) => {
        console.log('Resizing file');
        let resized = data.resize({
            width: resizeWidth,
        });
        resolve(resized);

        reject('this thing is broken')
    });
};


/* Write the image buffer to file on local disk */
function writeFile(imgPath: string, imgName: string, data: any) {
    fs.writeFile(writePath, data, (err: any) => {
        if (err) {
            console.error(err);
        }
        console.log('File written to:', writePath );
    })
}


