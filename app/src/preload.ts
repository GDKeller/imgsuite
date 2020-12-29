const fs = require('fs');
const sharp = require('sharp');


let imageBuffer = '';
let imageBufferArr: any;

document.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();


    // @ts-ignore
    for (const f of event.dataTransfer.files) {
        // Using the path attribute to get absolute file path
        console.log('File Path of dragged files: ', f.path)
        console.log(f)
        let imgName = f.name;
        imgName = imgName.replace((/.jpg/gi || /.jpeg/gi || /.png/gi), '');
        let imgPath: string = f.path;

        const outputPath = `${f.path.replace(f.name, '')}`;
        console.log('first output path:', outputPath);


        // readWriteFile(imgPath);

        // copyFiles();
        function copyFiles() {
            fs.copyFile(imgPath, `${outputPath}direct-write.jpg`, (err: any) => {
                if (err) {
                    console.error(err);
                }
            })
        }


        readFile();
        function readFile() {
            fs.readFile(imgPath, null, (err: any, data: any) => {
                if (err) {
                    console.error(err);
                }
                // console.log('the file content is:', data);
                imageBuffer = data.toString();
                imageBufferArr = data;

                // console.log(imageBuffer);
                // console.log(imageBufferArr);

                // writeFile(data);
                sharpWrite(imageBufferArr);

            });
        }



        // sharpWrite(imageBufferArr);
        function sharpWrite(imageBufferArr: string) {
            console.log('starting sharp write');
            sharp(imageBufferArr, { failOnError: false })
                // .toFile('/home/grant/Pictures/sharp-output.jpg', (err: any, info: any) => {
                //     if(err) {
                //         console.error(err)
                //     }
                //     console.log()
                //     console.log('info:', info)
                // })

                // .resize({
                //     width: 100
                // })
                .trim()
                .toBuffer()
                .then((data: string) => {
                    // @ts-ignore
                    // console.log(data.toString('base64'));
                    writeFile(data);

                })
                .catch((err: any) => {
                    console.error(err);
                });

        }




        // writeFile(imgPath)
        function writeFile(imgPath: string) {
            fs.writeFile(`${outputPath}${imgName}-sharped.jpg`, imgPath, (err: any) => {
                if (err) {
                    console.error(err);
                }
                console.log('file written');
            })
        }




        // console.log(image);
        // console.info(image);
        // image
        //     .metadata()
        //     .then(function(metadata: any){
        //         return image
        //             .webp()
        //             .toBuffer();
        //     })
        //     .then(function(data: any) {
        //         console.log(data);
        //     })


        // let imgBuffer = image
        // @ts-ignore
        // .toFile(outputPath, (err, info) => {
        //     console.log('output:', outputPath)
        //     console.log(info);
        // })
        // .toFile('/home/grant/Pictures/whatever.jpg', (err, info) => {
        // console.log(info)
        // writeImage(data);
        // })
        // @ts-ignore
        // .then(data => {
        //     console.log('after buffer')
        //     writeImage(data);
        // })
        // .catch((err: any) => {
        //     console.error(err)
        // })
        // .toFile('/home/grant/Pictures/output.jpg')
        // .then((info: any) => {
        //     console.log('output path:', outputPath);
        //     return info;
        // })
        // .catch((err: any) => {
        //     console.error(err);
        // })

        // function writeImage(data) {
        //     fs.writeFile('/home/grant/Pictures/filesystem_img.jpg', imgBuffer, (err: any) => {
        //         if(err) {
        //             console.error(err);
        //         }
        //     })
        // }


        function readWriteFile(imgPath: any) {
            const base64Data = imgPath.replace(/^data:image\/jpeg;base64,/, '');


            fs.readFile(imgPath, (err: any, data: any) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('the file content is:', data);

                writeFile(data);

            });
        }



    }
});

document.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});

document.addEventListener('dragenter', (event) => {
    console.log('File is in the Drop Space');
});

document.addEventListener('dragleave', (event) => {
    console.log('File has left the Drop Space');
});
