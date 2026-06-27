import { NextRequest, NextResponse } from 'next/server';

// Mock data - replace with actual database call
const mockPartnersData = {
  title: "Our Partners",
  partners: [
    {
      id: 1,
      name: "SkyTech",
      icon: "skytech.svg",
      website: "https://skytech.com"
    },
    {
      id: 2,
      name: "ChainBlock",
      icon: "chainblock.svg",
      website: "https://chainblock.com"
    },
    {
      id: 3,
      name: "NexusPoint",
      icon: "nexuspoint.svg",
      website: "https://nexuspoint.com"
    },
    {
      id: 4,
      name: "Apex",
      icon: "apex.svg",
      website: "https://apex.com"
    },
    {
      id: 5,
      name: "Velocity",
      icon: "velocity.svg",
      website: "https://velocity.com"
    }
  ]
};

export async function GET(request: NextRequest) {
  try {
    // Get locale from query params if provided
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale');

    // Here you would typically fetch from your database
    // For now, we'll return the mock data
    // You can modify the response based on locale if needed
    
    console.log(`Fetching partners for locale: ${locale || 'default'}`);
    
    return NextResponse.json(mockPartnersData, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400', // Cache for 1 hour
      },
    });

  } catch (error) {
    console.error('Error fetching partners:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch partners data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
