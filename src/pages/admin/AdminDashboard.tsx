import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle, Clock, Users } from 'lucide-react';

interface DashboardStats {
  totalPosts: number;
  pendingPosts: number;
  approvedPosts: number;
  totalUsers: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    pendingPosts: 0,
    approvedPosts: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Get posts stats
      const [postsResult, usersResult] = await Promise.all([
        supabase.from('posts').select('status'),
        supabase.from('users').select('id', { count: 'exact' })
      ]);

      if (postsResult.data) {
        const totalPosts = postsResult.data.length;
        const pendingPosts = postsResult.data.filter(p => p.status === 'pending').length;
        const approvedPosts = postsResult.data.filter(p => p.status === 'approved').length;
        
        setStats({
          totalPosts,
          pendingPosts,
          approvedPosts,
          totalUsers: usersResult.count || 0
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      icon: FileText,
      description: 'All blog posts'
    },
    {
      title: 'Pending Posts',
      value: stats.pendingPosts,
      icon: Clock,
      description: 'Awaiting approval'
    },
    {
      title: 'Approved Posts',
      value: stats.approvedPosts,
      icon: CheckCircle,
      description: 'Published posts'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      description: 'Registered users'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to UFSBD Admin Dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}