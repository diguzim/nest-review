import { IEmailService } from '../../../@core/services';

export const mockedEmailService: IEmailService = {
  sendEmail: jest.fn(),
};
