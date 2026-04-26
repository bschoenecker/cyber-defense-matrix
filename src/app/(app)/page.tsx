import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { CdmClient } from '@/components/cdm/cdm-client'

export default async function CdmPage() {
  const session = await auth()
  const canEdit = session?.user?.role === 'ADMIN' || session?.user?.role === 'EDITOR'

  const entries = await db.cdmEntry.findMany({
    include: { createdBy: { select: { name: true } } },
    orderBy: { createdAt: 'asc' },
  })

  return <CdmClient entries={entries} canEdit={canEdit} />
}
