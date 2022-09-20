const scrapeIt = require('scrape-it')
const productLinks = require('./neonsignsnow-product-link')
const productOper = require('./add-product')
const collections = require('./collection')

const { addProduct, addProductPrice, productRelationCollection } = productOper

const convertDescription = descriptions => {
    return descriptions.filter(text => typeof text === 'string').join('\r\n')
}

const getProduct = scrapeProduct => {
    const { title, images, descriptions, options } = scrapeProduct
    return {
        title,
        handle: '',
        status: 'published',
        description: convertDescription(descriptions),
        thumbnail: images,
        images: [images],
        options: [
            {
                title: 'size',
            },
        ],
        tags: [],
        variants: options.map(option => ({
            title: option.name,
            sku: null,
            ean: null,
            inventory_quantity: 1000,
            prices: [],
            options: [
                {
                    value: option.size,
                },
            ],
        })),
        mid_code: '',
        hs_code: '',
        is_giftcard: false,
        discountable: false,
    }
}

const getProductPrice = (options, variant) => {
    let amount = options.find(
        option => option.size === variant.options[0].value,
    ).price
    amount = Math.floor(Number(amount.replace('$', ''))) * 100

    return {
        options: [
            {
                option_id: variant.options[0].option_id,
                value: variant.options[0].value,
            },
        ],
        prices: [
            {
                currency_code: 'usd',
                amount,
            },
            {
                currency_code: 'eur',
                amount,
            },
        ],
    }
}

const SCRAPE_PRODUCT_OPTIONS = {
    collection: {
        selector: 'ol.breadcrumb .breadcrumb-item',
        eq: 1,
    },
    title: '.breadcrumb-item.active',
    images: {
        selector: '#lightSlider span',
        attr: 'data-thumb',
    },
    descriptions: {
        listItem: '.mt-2.product-descriptions  p',
        selector: 'span',
    },
    options: {
        listItem: '.pro-size-selects .customStyle-product .description-div',
        data: {
            size: '.size',
            price: '.price',
            name: '.name',
        },
    },
}

const PRODUCT_PREFIX = 'https://www.neonsignsnow.com/product/'

const scrapeProductInfo = async () => {
    for await (const { data } of productLinks.map(link =>
        scrapeIt(PRODUCT_PREFIX + link, SCRAPE_PRODUCT_OPTIONS),
    )) {
        const { options, title, collection } = data

        try {
            const respProduct = await addProduct(getProduct(data))
            console.log(
                'added [ ' +
                    title +
                    ' ] successfully. collection: [' +
                    collection +
                    '] collectionId: [' +
                    collections[collection] +
                    ']',
            )
            Promise.all([
                ...respProduct.variants.map(variant => {
                    addProductPrice(
                        respProduct.id,
                        variant.id,
                        getProductPrice(options, variant),
                    )
                }),
                productRelationCollection(
                    respProduct.id,
                    collections[collection],
                ),
            ])
                .then(() => {
                    console.log(
                        'added [ ' +
                            title +
                            ' ] prices and collection successfully',
                    )
                })
                .catch(error => {
                    console.error(
                        'added [ ' + title + ' ] prices or collection failed, ',
                        error,
                    )
                })
        } catch (error) {
            console.error('added [ ' + title + ' ] failed, ', error)
        }
    }
}
// scrapeProductLink('https://www.neonsignsnow.com/product/neon-light', 1)

scrapeProductInfo()

// const scrapeProductLink = async (url, page) => {
//     console.log(`scraping page ${page} ...`)
//     const {
//         data: { products },
//     } = await scrapeIt(`${url}?page=${page}`, {
//         products: {
//             listItem: '.category-product-list .category-product-item',
//             data: {
//                 url: {
//                     selector: 'a',
//                     attr: 'href',
//                 },
//             },
//         },
//     })
//     if (products.length) {
//         scrapeProductLink(url, page + 1)
//         productLinks = productLinks.concat(
//             ...products.map(product => product.url),
//         )
//     } else {
//         console.log(productLinks.join())
//     }
// }
