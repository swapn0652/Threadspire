import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeedService {
    constructor(private prisma: PrismaService) {}

    async getFeedForUser(userId: string) {
        const memberships = await this.prisma.cellMembership.findMany({
            where: { userId },
            select: { cellId: true }
        });

        const cellIds = memberships.map(m => m.cellId);

        return this.prisma.post.findMany({
            where: { cellId: { in: cellIds } },
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { id: true, name: true, username: true } },
                cell: { select: { id: true, name: true, title: true } },
            },
        });
    }
}
