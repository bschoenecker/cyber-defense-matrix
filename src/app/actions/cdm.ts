'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { requireEditor } from '@/lib/auth-helpers'

export async function createCdmEntry(fd: FormData) {
  const session = await requireEditor()

  const title = (fd.get('title') as string)?.trim()
  const assetClass = fd.get('assetClass') as string
  const nistFunction = fd.get('nistFunction') as string
  const description = (fd.get('description') as string)?.trim() || null
  const tool = (fd.get('tool') as string)?.trim() || null
  const notes = (fd.get('notes') as string)?.trim() || null
  const pptRaw = fd.get('pptValue')
  const pptValue = pptRaw !== '' && pptRaw !== null ? parseFloat(pptRaw as string) : null
  const procRaw = fd.get('processValue')
  const processValue = procRaw !== '' && procRaw !== null ? parseFloat(procRaw as string) : null

  if (!title) throw new Error('Title required')

  await db.cdmEntry.create({
    data: {
      title,
      assetClass,
      nistFunction,
      description,
      tool,
      notes,
      pptValue,
      processValue,
      implemented: false,
      createdById: session.user.id ?? null,
    },
  })

  revalidatePath('/')
}

export async function updateCdmEntry(id: string, fd: FormData) {
  await requireEditor()

  const title = (fd.get('title') as string)?.trim()
  const description = (fd.get('description') as string)?.trim() || null
  const tool = (fd.get('tool') as string)?.trim() || null
  const notes = (fd.get('notes') as string)?.trim() || null
  const implemented = fd.get('implemented') === 'true'
  const pptRaw = fd.get('pptValue')
  const pptValue = pptRaw !== '' && pptRaw !== null ? parseFloat(pptRaw as string) : null
  const procRaw = fd.get('processValue')
  const processValue = procRaw !== '' && procRaw !== null ? parseFloat(procRaw as string) : null

  if (!title) throw new Error('Title required')

  await db.cdmEntry.update({
    where: { id },
    data: { title, description, tool, notes, implemented, pptValue, processValue },
  })

  revalidatePath('/')
}

export async function toggleCdmImplemented(id: string, implemented: boolean) {
  await requireEditor()
  await db.cdmEntry.update({ where: { id }, data: { implemented } })
  revalidatePath('/')
}

export async function deleteCdmEntry(id: string) {
  await requireEditor()
  await db.cdmEntry.delete({ where: { id } })
  revalidatePath('/')
}
