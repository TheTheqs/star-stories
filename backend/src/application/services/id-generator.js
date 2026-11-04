import {randomUUID} from 'crypto';

export class IdGenerator
{
    generateId()
    {
        return randomUUID();
    }
}