import { SupabaseClient } from '@supabase/supabase-js';

const INITIAL_TOKENS = 10;

export async function ensureUserTokens(supabase: SupabaseClient, userId: string): Promise<number> {
  // First try to get existing tokens
  const { data: existingTokens } = await supabase
    .from('user_tokens')
    .select('tokens_remaining')
    .eq('user_id', userId)
    .maybeSingle();

  if (existingTokens) {
    return existingTokens.tokens_remaining;
  }

  // If no tokens exist, try to create them
  try {
    const { data: newTokens, error } = await supabase
      .from('user_tokens')
      .insert([{ user_id: userId, tokens_remaining: INITIAL_TOKENS }])
      .select('tokens_remaining')
      .single();

    if (error) {
      // If insert failed, try to get tokens one more time (in case of race condition)
      const { data: retryTokens } = await supabase
        .from('user_tokens')
        .select('tokens_remaining')
        .eq('user_id', userId)
        .single();

      return retryTokens?.tokens_remaining ?? INITIAL_TOKENS;
    }

    return newTokens.tokens_remaining;
  } catch (error) {
    console.error('Error managing user tokens:', error);
    return INITIAL_TOKENS;
  }
}