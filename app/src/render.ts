console.log('render loaded')

document.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('File dropped');

    var files = event.dataTransfer.files;
    var file;
    console.log(files);

    for (var i = 0; i < files.length; i++) {

        // get item
        file = files.item(i);
        //or
        file = files[i];

        console.log('File Name:', file.name);
        console.log('File Path:', file.path);
    }
    // files.forEach(f => {
    //     console.log('File Path of dragged files: ', f.path);
    //     console.log(f)
    // });
    // for (const f of event.dataTransfer.files) {
    //     // Using the path attribute to get absolute file path
    //     console.log('File Path of dragged files: ', f.path);
    //     console.log(f)
    // }

    // @ts-ignore
    file_info({
        'path': file.path,
        'name': file.name
    });
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
