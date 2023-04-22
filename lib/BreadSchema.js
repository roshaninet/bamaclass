const BreadCrumbSchema = (breadcrumbs , active) => {

    let list = [];
    let i = 1;
    breadcrumbs.forEach((bread , j) => {
        list.push({
            '@type': 'ListItem',
            'name': bread.title,
            'position': i++,
            'item': bread.url
        });
    });

    list.push({
        '@type': 'ListItem',
        'name': active,
        'position': i++,
    });


    let schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": list
    }

    return JSON.stringify(schema, null, 0);

}

export default BreadCrumbSchema;
