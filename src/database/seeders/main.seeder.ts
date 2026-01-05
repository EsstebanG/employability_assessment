import { DataSource } from 'typeorm';

/* import { userSeeder } from './user.seeder';
import { vacancySeeder } from './client.seeder';
import { applicationSeeder } from './technician.seeder'; */


export async function runSeeders(dataSource: DataSource): Promise<void> {
    console.log('🌱 Running all seeders...\n');

    try {
        // await userSeeder(dataSource);
        // await vacancySeeder(dataSource);
        // await applicationSeeder(dataSource);
    } catch (error) {
        console.error('❌ Error during seed execution:', error);
    }

    console.log('\n🌾 All seeders executed successfully!');
}