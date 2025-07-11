import { NextResponse } from 'next/server';
import { getGroupById, updateGroup, deleteGroup } from '../../../lib/groups';

// GET /api/groups/[id] - Get group by ID
export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Group ID is required' 
        },
        { status: 400 }
      );
    }

    const group = await getGroupById(id);
    
    if (!group) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Group not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: group
    });
    
  } catch (error) {
    console.error('Error in GET /api/groups/[id]:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid group ID' 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch group' 
      },
      { status: 500 }
    );
  }
}

// PUT /api/groups/[id] - Update group
export async function PUT(request, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Group ID is required' 
        },
        { status: 400 }
      );
    }

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

    // Update group data
    const groupData = {
      name: body.name.trim(),
      description: body.description?.trim() || '',
      businessHours: body.businessHours || 'General working hours'
    };

    const group = await updateGroup(id, groupData);
    
    if (!group) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Group not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: group,
      message: 'Group updated successfully'
    });
    
  } catch (error) {
    console.error('Error in PUT /api/groups/[id]:', error);
    
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
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid group ID' 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to update group' 
      },
      { status: 500 }
    );
  }
}

// DELETE /api/groups/[id] - Delete group
export async function DELETE(request, { params }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    
    if (!id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Group ID is required' 
        },
        { status: 400 }
      );
    }

    const group = await deleteGroup(id);
    
    if (!group) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Group not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: group,
      message: 'Group deleted successfully'
    });
    
  } catch (error) {
    console.error('Error in DELETE /api/groups/[id]:', error);
    
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid group ID' 
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete group' 
      },
      { status: 500 }
    );
  }
}