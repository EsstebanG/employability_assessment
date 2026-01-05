import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../../users/entities/user.entity';
import { Role } from '../../common/enums/role.enum';

export class userSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(User);

    const users = [
      {
        name: 'Admin User',
        email: 'admin@riwi.io',
        password: 'admin123',
        role: Role.ADMIN,
      },
      {
        name: 'Gestor User',
        email: 'gestor@riwi.io',
        password: 'gestor123',
        role: Role.GESTOR,
      },
    ];

    for (const user of users) {
      const exists = await repo.findOne({ where: { email: user.email } });
      if (exists) {
        console.log(`✔ User already exists: ${user.email}`);
        continue;
      }

      const hashed = await bcrypt.hash(user.password, 10);

      const newUser = repo.create({
        name: user.name,
        email: user.email,
        password: hashed,
        role: user.role,
      });

      await repo.save(newUser);
      console.log(`✅ User seeded: ${user.email} (${user.role})`);
    }
  }
}
