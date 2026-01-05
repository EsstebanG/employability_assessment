import { DataSource } from 'typeorm';

import { userSeeder } from './user.seeder';


export async function runSeeders(dataSource: DataSource): Promise<void> {
    console.log('🌱 Running all seeders...\n');

    try {
        await new userSeeder().run(dataSource);
    } catch (error) {
        console.error('❌ Error during seed execution:', error);
    }

    console.log('\n🌾 All seeders executed successfully!');
}