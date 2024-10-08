import {NextRequest, NextResponse} from 'next/server'

const allowedOrigins = ['https://localhost:3000', 'http://8.152.161.200', 'http://www.flexux.cn:']
 
const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': "true",
}

export function middleware(request: NextRequest) {
    // Check the origin from the request
    const origin = request.headers.get('origin') ?? ''
    const isAllowedOrigin = allowedOrigins.includes(origin)
   
    // Handle preflighted requests
    const isPreflight = request.method === 'OPTIONS'
   
    if (isPreflight) {
      const preflightHeaders = {
        ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
        ...corsOptions,
      }
      return NextResponse.json({}, { headers: preflightHeaders })
    }
   
    // Handle simple requests
    const response = NextResponse.next()
   
    if (isAllowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', origin)
    }
   
    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
   
    return response
  }
   
  export const config = {
    matcher: '/api/:path*',
  }