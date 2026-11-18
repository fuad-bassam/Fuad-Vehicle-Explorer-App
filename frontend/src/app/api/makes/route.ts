import { NextResponse, type NextRequest } from 'next/server';
import { searchMakes } from '@/services/vehicles/vehicles';

export async function GET(request: NextRequest) {
  const keyword = request.nextUrl.searchParams.get('keyword') ?? '';
  const { status, ...body } = await searchMakes(keyword);

  return NextResponse.json(body, { status });
}
