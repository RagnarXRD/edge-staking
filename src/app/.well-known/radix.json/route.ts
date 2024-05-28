import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    dApps: [
      {
        dAppDefinitionAddress: 'account_rdx129ak5rtrlrknmnjq58tj9nurnzq5rs5dt5244t3t7k04det7lwc7pq',
      },
    ],
  })
}
