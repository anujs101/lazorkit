'use client';

import './polyfills';
import { useState } from 'react';
import { useWallet } from '@lazorkit/wallet';
import { SystemProgram, PublicKey } from '@solana/web3.js';
type UIState = 'default' | 'processing' | 'success';

export default function CheckoutPage() {
  const [state, setState] = useState<UIState>('default');

  const {
  connect,
  isConnected,
  smartWalletPubkey,
  signAndSendTransaction,
} = useWallet();

  const handlePayment = async () => {
  try {
    setState('processing');

    // 1. Ensure passkey + wallet
    if (!isConnected) {
      await connect();
    }

    if (!smartWalletPubkey) {
      throw new Error('Smart wallet not available');
    }

    // 2. Recipient (your provided pubkey)
    const recipient = new PublicKey(
      'nqiPhEae4JmmvSJHR3pK6wJmakgbnsf7eipq8gFCfcg'
    );

    // 3. Build SOL transfer instruction
    const instruction = SystemProgram.transfer({
      fromPubkey: smartWalletPubkey,
      toPubkey: recipient,
      lamports: 100, // minimal amount for demo
    });

    // 4. Send gasless transaction via Lazorkit
    await signAndSendTransaction({
      instructions: [instruction],
    });

    setState('success');
  } catch (err) {
    console.log('hello');
    //console.error(err);
    setState('default');
  }
};

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-lg p-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-medium text-neutral-50">
              Premium Access
            </h1>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Unlock full access to all features and premium content
            </p>
          </div>

          <div className="border-t border-neutral-800 pt-6">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-medium text-neutral-50">$1</span>
              <span className="text-neutral-500 text-sm">one-time</span>
            </div>
          </div>

          <div className="pt-2">
            {state === 'default' && (
              <button
                onClick={handlePayment}
                className="w-full bg-neutral-700 text-neutral-50 py-3 px-4 rounded text-sm font-medium hover:bg-neutral-600 transition-colors"
              >
                Pay $1
              </button>
            )}

            {state === 'processing' && (
              <div className="w-full bg-neutral-800 text-neutral-400 py-3 px-4 rounded text-sm font-medium text-center">
                Connecting with passkey…
              </div>
            )}

            {state === 'success' && (
              <div className="w-full bg-neutral-800 text-neutral-50 py-3 px-4 rounded text-sm font-medium text-center">
                Wallet connected successfully
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}