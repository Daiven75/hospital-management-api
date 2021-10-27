import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Scheduling } from 'src/scheduling/scheduling';

@Injectable()
export class MailService {
    constructor(private mailService: MailerService) { }

    public async sendEmailConfirmationSchedule(email: string, scheduling: Scheduling): Promise<void> {
        await this.mailService.sendMail({
            to: email,
            from: 'No Reply <noreply.hma@gmail.com>',
            replyTo: 'noreply.hma@gmail.com',
            subject: 'HMA',
            template: './confirmationSchedule',
            context: {
                scheduleStartTime: this.getFullHours(scheduling.scheduleStartTime),
                scheduleEndTime: this.getFullHours(scheduling.scheduleEndTime),
                schuduleDate: this.getFullDate(scheduling.scheduleStartTime),
                specialty: scheduling.specialty,
                doctor: scheduling.doctor.name,
                crm: scheduling.doctor.crm.substring(4, scheduling.doctor.crm.length)
            }
        });
    }

    private getFullHours(date: Date): string {
        const hours = new Date(date).getHours()
        const minutes = new Date(date).getMinutes() === 0 ? '00' : new Date(date).getMinutes();
        return `${hours}:${minutes}`;
    }

    private getFullDate(date: Date): string {
        const day = new Date(date).getDate().toString().padStart(2, '0');
        var month: any = new Date(date).getMonth() + 1;
        month = month.toString().padStart(2, '0');
        const year = new Date(date).getFullYear();
        return `${day}/${month}/${year}`;
    }
}