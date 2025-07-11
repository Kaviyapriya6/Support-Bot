
import mongoose from 'mongoose';
import Group from '../models/groups';
import Agent from '../models/agent';
import { dbConnect } from './mongodb';

// Get all groups
export const getGroups = async () => {
  try {
    await dbConnect();
    const groups = await Group.find({}).sort({ createdAt: -1 });
    
    // Calculate active agents for each group
    const groupsWithAgentCount = await Promise.all(
      groups.map(async (group) => {
        const agentCount = await Agent.countDocuments({
          groups: group.name
        });
        
        return {
          ...group.toObject(),
          activeAgents: agentCount
        };
      })
    );
    
    return groupsWithAgentCount;
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw error;
  }
};

// Get group by ID
export const getGroupById = async (id) => {
  try {
    await dbConnect();
    const group = await Group.findById(id);
    return group;
  } catch (error) {
    console.error('Error fetching group:', error);
    throw error;
  }
};

// Create new group
export const createGroup = async (groupData) => {
  try {
    await dbConnect();
    const group = new Group(groupData);
    await group.save();
    return group;
  } catch (error) {
    console.error('Error creating group:', error);
    throw error;
  }
};

// Update group
export const updateGroup = async (id, groupData) => {
  try {
    await dbConnect();
    const group = await Group.findByIdAndUpdate(
      id,
      { ...groupData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    return group;
  } catch (error) {
    console.error('Error updating group:', error);
    throw error;
  }
};

// Delete group
export const deleteGroup = async (id) => {
  try {
    await dbConnect();
    const group = await Group.findByIdAndDelete(id);
    return group;
  } catch (error) {
    console.error('Error deleting group:', error);
    throw error;
  }
};

// Add agent to group
export const addAgentToGroup = async (groupId, agentId) => {
  try {
    await dbConnect();
    const group = await Group.findByIdAndUpdate(
      groupId,
      { 
        $addToSet: { agents: agentId },
        $inc: { activeAgents: 1 }
      },
      { new: true }
    );
    return group;
  } catch (error) {
    console.error('Error adding agent to group:', error);
    throw error;
  }
};

// Remove agent from group
export const removeAgentFromGroup = async (groupId, agentId) => {
  try {
    await dbConnect();
    const group = await Group.findByIdAndUpdate(
      groupId,
      { 
        $pull: { agents: agentId },
        $inc: { activeAgents: -1 }
      },
      { new: true }
    );
    return group;
  } catch (error) {
    console.error('Error removing agent from group:', error);
    throw error;
  }
};
