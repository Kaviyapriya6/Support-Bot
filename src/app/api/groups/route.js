import { NextResponse } from 'next/server';
import { getGroups, createGroup } from '../../lib/groups';

// GET /api/groups - Get all groups
export async function GET() {
  try {
    const groups = await getGroups();
    return NextResponse.json({
      success: true,
      data: groups,
      count: groups.length
    });
  } catch (error) {
    console.error('Error in GET /api/groups:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch groups' 
      },
      { status: 500 }
    );
  }
}

// POST /api/groups - Create new group
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Group name is required' 
        },
        { status: 400 }
      );
    }

    // Create group data
    const groupData = {
      name: body.name.trim(),
      description: body.description?.trim() || '',
      businessHours: body.businessHours || 'General working hours',
      activeAgents: 0
    };

    const group = await createGroup(groupData);
    
    return NextResponse.json({
      success: true,
      data: group,
      message: 'Group created successfully'
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error in POST /api/groups:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { 
          success: false, 
          error: error.message 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create group' 
      },
      { status: 500 }
    );
  }
}