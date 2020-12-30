
let droparea = document.getElementById('droparea');




// File Drop
droparea.addEventListener('drop', (event) => {
    event.preventDefault();
    event.stopPropagation();
    droparea.classList.remove('hover');
    droparea.classList.add('finished');
    console.log('File dropped');

    var files = event.dataTransfer.files;
    var file;
    // console.log(files);

    let checkboxResize = document.getElementById('check_resize');
    // @ts-ignore
    let checkboxResizeState = checkboxResize.checked;

    // @ts-ignore
    let resizeWidth = parseInt(document.getElementById('input_width').value);
    console.log('width:', resizeWidth);


    let checkboxTrim = document.getElementById('check_trim');
    // @ts-ignore
    let checkboxTrimState = checkboxTrim.checked;


    for (var i = 0; i < files.length; i++) {

        // get item
        file = files.item(i);
        //or
        file = files[i];


        // @ts-ignore
        processFiles({
            'path': file.path,
            'name': file.name,
            'trim': checkboxTrimState,
            'resize': {
                'shouldResize': checkboxResizeState,
                'width': resizeWidth,
            }
        })

        // console.log('File Name:', file.name);
        // console.log('File Path:', file.path);
    }


});


droparea.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('Dragover')
});

droparea.addEventListener('dragenter', (event) => {
    console.log('File is in the Drop Space');
    droparea.classList.add('hover');
});

droparea.addEventListener('dragleave', (event) => {
    console.log('File has left the Drop Space');
    droparea.classList.remove('hover');
});
