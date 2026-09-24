import { DatabaseService } from './database.service';
export declare class DatabaseController {
    private readonly dbService;
    constructor(dbService: DatabaseService);
    clearAllData(): Promise<void>;
}
