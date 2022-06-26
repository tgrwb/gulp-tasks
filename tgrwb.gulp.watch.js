
module.exports = (baseParams)=>{

    const {src, assets} = baseParams;

    return {
        html: [src, '**', '*.html'].join('/'),
        images: [src, assets, 'images', '**', '*.@(jpg|jpeg|png|svg)'].join('/'),
        lang: [src, '**', '*.@(pot|po|mo)'].join('/'),
        less: [src, '**', assets, 'styles', '*.less'].join('/'),
        other: [src, '**', '.other.config.json'].join('/'),
        php: [src, '**', '*.php'].join('/'),
        scripts: [src, '**', '*.js'].join('/')
    };
};
