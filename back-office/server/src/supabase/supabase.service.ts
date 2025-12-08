/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  public client: SupabaseClient;

  constructor() {
    const url = process.env.SUPABASE_URL as string;
    const key = process.env.SUPABASE_KEY as string;

    if (!url || !key) {
      throw new Error(
        '❌ SUPABASE_URL ou SUPABASE_KEY est manquant dans le .env',
      );
    }

    this.client = createClient(url, key);
  }
}
