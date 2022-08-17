import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Company from 'App/Models/Company'
import { DateTime } from 'luxon'

export default class StatusesController {
  public async index() {
    const companies = await Company.all()
    return {
      status: true,
      message: 'Companies fetched',
      data: companies,
    }
  }

  public async store({ request }: HttpContextContract) {
    const payload = request.body()
    const company = await Company.create(payload)

    return {
      status: true,
      message: 'Company created',
      data: company,
    }
  }

  public async show({ params }: HttpContextContract) {
    const company = await Company.findOrFail(params.id)

    return {
      status: true,
      message: 'Company fetched',
      data: company,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    let company = await Company.findOrFail(params.id)
    company.name = request.body().name

    await company.save()

    return {
      status: true,
      message: 'Company updated',
      data: company,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    let company = await Company.findOrFail(params.id)

    company.statusId = 3
    company.deletedAt = DateTime.now()

    return {
      status: true,
      message: 'Company deleted',
      data: null,
    }
  }
}
