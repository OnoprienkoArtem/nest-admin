import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class UploadController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }
}
