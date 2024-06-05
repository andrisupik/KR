import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from '../models';

@Pipe({
    name: 'validateRoles'
})
export class ValidateRolesPipe implements PipeTransform {
    transform(value: UserRole[], role: UserRole): boolean {
        return value.includes(role);
    }
}
