import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import { DateTime } from 'luxon'

const products = require('../../../products.json')

export default class ProductsController {
  public async index() {
    const products = await Product.all()
    return {
      status: true,
      message: 'Products fetched',
      data: {
        total: products.length,
        products,
      },
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

  public async storeMany({ request }: HttpContextContract) {
    console.log(request.body())
    const productsPayload = products.map((product) => {
      return {
        ...product,
        statusId: Math.floor(Math.random() * 3),
      }
    })
    const newProducts = await Product.createMany(productsPayload)

    return {
      status: true,
      message: 'Product created',
      data: newProducts,
    }
  }

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

    return {
      status: true,
      message: 'Product deleted',
      data: null,
    }
  }
}
