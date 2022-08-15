import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Status from 'App/Models/Status'

export default class StatusesController {
  public async index() {
    const statuses = await Status.all()
    return {
      status: true,
      message: 'Statuses fetched',
      data: statuses,
    }
  }

  public async store({ request }: HttpContextContract) {
    const payload = request.body()
    const status = await Status.create(payload)

    return {
      status: true,
      message: 'Status created',
      data: status,
    }
  }

  public async show({ params }: HttpContextContract) {
    const status = await Status.findOrFail(params.id)

    return {
      status: true,
      message: 'Status fetched',
      data: status,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    let status = await Status.findOrFail(params.id)
    status.name = request.body().name
    status.label = request.body().label

    await status.save()

    return {
      status: true,
      message: 'Status updated',
      data: status,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    let status = await Status.findOrFail(params.id)
    await status.delete()

    return {
      status: true,
      message: 'Status deleted',
      data: null,
    }
  }
}
