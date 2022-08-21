import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import { DateTime } from 'luxon'

// Used to populate the products db
// const products = require('../../../products.json')

export default class ProductsController {
  public async index({ request }: HttpContextContract) {
    const Products = Product.query()

    /**
     * Always returned products that are not deleted [status_id === 3]
     */
    Products.where('status_id', '!=', 3)

    const { page, limit, order, range, fields } = request.qs()
    const pageInt = Number(page) || 1
    const limitInt = Number(limit) || 10

    /**
     * Filter [Where] Properties
     */
    if (range) {
      const regEx = /\b(>|>=|=|<|<=)/g
      let rangeFilters = range.replace(regEx, (match) => `_${match}_`)

      const options = ['price', 'rating']

      rangeFilters.split(',').forEach((property) => {
        const [key, operator, value] = property.split('_')

        if (options.includes(key)) {
          Products.where(key, operator, value)
        }
      })
    }
    /**
     * Order Properties
     */
    let orderBy = []
    if (order) {
      orderBy = order.split(',').map((property) => {
        return {
          column: property.charAt(0) === '-' ? property.slice(1) : property,
          order: property.charAt(0) === '-' ? 'desc' : 'asc',
        }
      })
    }

    let data = await Products.orderBy(orderBy).paginate(pageInt, limitInt)

    const products = fields
      ? data.serialize({
          fields: fields.split(','),
        })
      : data

    return {
      status: true,
      message: 'Products fetched',
      data: products,
    }
  }

  public async store({ request }: HttpContextContract) {
    const payload = {
      ...request.body(),
      statusId: Math.floor(Math.random() * 3),
      companyId: Math.floor(Math.random() * 5),
    }
    const product = await Product.create(payload)

    return {
      status: true,
      message: 'Product created',
      data: product,
    }
  }

  /**
   * Used to populate the products db
   * @param params
   */
  // public async storeMany({ request }: HttpContextContract) {
  //   console.log(request.body())
  //   const productsPayload = products.map((product) => {
  //     return {
  //       ...product,
  //       statusId: Math.floor(Math.random() * 3),
  //     }
  //   })
  //   const newProducts = await Product.createMany(productsPayload)
  //
  //   return {
  //     status: true,
  //     message: 'Product created',
  //     data: newProducts,
  //   }
  // }

  public async show({ params }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)

    return {
      status: true,
      message: 'Product fetched',
      data: product,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    let product = await Product.findOrFail(params.id)
    product.name = request.body().name
    product.statusId = request.body().status_id

    await product.save()

    return {
      status: true,
      message: 'Product updated',
      data: product,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    let product = await Product.findOrFail(params.id)

    product.statusId = 3
    product.deletedAt = DateTime.now()

    await product.save()

    return {
      status: true,
      message: 'Product deleted',
      data: null,
    }
  }
}
