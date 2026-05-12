import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X, Lock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { toast } from "sonner";

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Library Street, Academic City, AC 12345",
    dateOfBirth: "1990-01-15",
    memberSince: "2023-01-01",
  });

  const [editData, setEditData] = useState(profileData);

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-['Poppins'] text-3xl font-bold text-gray-900 mb-8">
            My Profile
          </h1>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <Card className="p-6 lg:col-span-1 h-fit">
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative inline-block mb-4"
                >
                  <Avatar className="w-32 h-32 mx-auto">
                    <AvatarFallback className="text-3xl bg-primary text-white">
                      {profileData.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {!isEditing && (
                    <button className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 hover:bg-primary/90">
                      <Edit2 className="h-4 w-4" />
                    </button>
                  )}
                </motion.div>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {profileData.name}
                </h2>
                <p className="text-gray-600 mb-4">Library Member</p>
                
                <div className="bg-gray-50 rounded-lg p-3 text-sm">
                  <p className="text-gray-500">Member Since</p>
                  <p className="font-medium text-gray-900">
                    {new Date(profileData.memberSince).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </Card>

            {/* Profile Information */}
            <Card className="p-6 lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Profile Information</h3>
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
                    <Edit2 className="h-4 w-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="gap-2 bg-primary">
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" className="gap-2">
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-gray-400" />
                    Full Name
                  </Label>
                  {isEditing ? (
                    <Input
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-900 pl-6">{profileData.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    Email Address
                  </Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-900 pl-6">{profileData.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    Phone Number
                  </Label>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-900 pl-6">{profileData.phone}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    Date of Birth
                  </Label>
                  {isEditing ? (
                    <Input
                      type="date"
                      value={editData.dateOfBirth}
                      onChange={(e) => setEditData({ ...editData, dateOfBirth: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-900 pl-6">
                      {new Date(profileData.dateOfBirth).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    Address
                  </Label>
                  {isEditing ? (
                    <Textarea
                      value={editData.address}
                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-900 pl-6">{profileData.address}</p>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Change Password Card */}
          <Card className="p-6 mt-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-primary/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Lock className="h-6 w-6 text-primary" />
                  Security Settings
                </h3>
                <p className="text-gray-600 text-sm">Manage your password and account security</p>
              </div>
              <Link to="/update-password">
                <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg gap-2">
                  <Lock className="h-4 w-4" />
                  Update Password
                </Button>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Lock className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">Password Protection</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Your password was last changed on <strong>January 15, 2024</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    We recommend changing your password every 3-6 months to keep your account secure.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}