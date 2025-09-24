import { prisma } from './db'

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: { name: 'Alice' },
    create: { email: 'alice@example.com', name: 'Alice' }
  })

  const post = await prisma.post.create({
    data: {
      title: 'Hello Local PG',
      content: 'Prisma + Postgres locally',
      published: true,
      authorId: user.id
    }
  })

  const posts = await prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: 'desc' }
  })
  console.log({ user, post, count: posts.length })
}

main().finally(() => prisma.$disconnect())
