export const photos = (props) => {
    console.log(props, 'props');
    if (props.length > 0) {
        let picturesArr = [];
        props.map((picUrl, idx) => {
            let pictureObject = {};
            pictureObject.src = picUrl;
            pictureObject.width = Math.floor(
                Math.random() * (1500 - 1000 + 1) + 1000
            );
            pictureObject.height = Math.floor(
                Math.random() * (1000 - 500 + 1) + 1000
            );
            picturesArr.push(pictureObject);
        });
        return picturesArr;
    } else {
        return [];
    }
};
