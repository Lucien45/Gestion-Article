/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  public client: SupabaseClient;
  private bucket: string;

  constructor() {
    const url = process.env.SUPABASE_URL as string;
    const key = process.env.SUPABASE_KEY as string;
    this.bucket = process.env.SUPABASE_BUCKET || 'uploads';

    if (!url || !key) {
      throw new Error(
        '❌ SUPABASE_URL ou SUPABASE_KEY est manquant dans le .env',
      );
    }

    this.client = createClient(url, key);
  }

  async uploadFile(filePath: string, file: Buffer) {
    return await this.client.storage
      .from(this.bucket)
      .upload(filePath, file, { upsert: true });
  }
}
