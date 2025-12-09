import React, { useEffect, useState } from 'react';
import { Camera, Mail, User as UserIcon } from 'lucide-react';
import { Token } from '../utils/Token';
import { UserService } from '../services/user.service';
import { supabaseBucket, supabaseUrl } from '../services/api';

interface User {
    id: number;
    email: string;
    username: string;
    profile?: string;
    role: string;
    date_creation: string;
}

export const ProfilePage: React.FC = () => {
    const [user, setUser]  = useState<User | null>(null);
    const userProfile = JSON.parse(Token.GetToken("profile") as string);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        photoUrl: '',
    });

    useEffect(() => {
        if (userProfile) {
          UserService.getUserById(userProfile.id)
          .then((res) => {
            setUser(res.data);
            setFormData({
                username: res.data.username,
                email: res.data.email,
                photoUrl: res.data.profile,
            })
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err)
          })
        }else {
          setUser(null);
        }
      }, []);

    if (!user) {
        return (
        <div className="text-center py-8">
            <p className="text-gray-600">Veuillez vous connecter pour accéder à votre profil.</p>
        </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        // await updateProfile(formData);
        setIsEditing(false);
        } catch (error) {
        console.error('Error updating profile:', error);
        }
    };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Cover Photo */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />

        {/* Profile Info */}
        <div className="px-6 py-8">
          <div className="flex flex-col items-center -mt-20 mb-6">
            <div className="relative">
              <img
                src={
                  user?.profile 
                  // ? `${apiUrl}/${user.profile}` 
                  ? `${supabaseUrl}/storage/v1/object/public/${supabaseBucket}/${user.profile}`
                  : user?.username || `https://ui-avatars.com/api/?name=${user.username}`}
                alt={user.username}
                className="w-32 h-32 rounded-full border-4 border-white shadow-md"
              />
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg">
                  <Camera className="h-5 w-5" />
                </button>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-4">{user.username}</h1>
            <p className="text-gray-600">{user.role}</p>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Nom d'utilisateur
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-gray-900">{user.email}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Membre depuis</h3>
                <p className="mt-1 text-gray-900">
                  {new Date(user.date_creation).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Modifier le profil
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};