import { Module } from 'medusa-extender';
import { ArtworkService } from './artwork.service';
import { ArtworkMigration1666333838809 } from './1666333838809-artwork.migration';
import { ArtworkRouter } from './artwork.router';
import { ArtworkRepository } from './artwork.repository';
import { Artwork } from './artwork.entity';

@Module({
    imports: [Artwork, ArtworkRepository, ArtworkRouter, ArtworkMigration1666333838809, ArtworkService]
})
export class ArtworkModule {}