import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      const msg = `"${value}" is an invalid status`;
      throw new BadRequestException(msg);
    }

    return value;
  }

  private isStatusValid(status: any): boolean {
    const idx = this.allowedStatuses.indexOf(status);

    return idx !== -1;
  }
}