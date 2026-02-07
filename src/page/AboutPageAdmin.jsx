import React, { useState, useEffect } from "react";
import {
  getAllAboutPages,
  createAboutPage,
  updateAboutPage,
  deleteAboutPage,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
  addAchievement,
  updateAchievement,
  deleteAchievement,
  addBrandLogo,
  updateBrandLogo,
  deleteBrandLogo,
  uploadFile,
} from "../services/api";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaUpload,
  FaEye,
  FaEyeSlash,
  FaSort,
  FaArrowUp,
  FaArrowDown,
  FaUser,
  FaTrophy,
  FaBuilding,
  FaImage,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaGithub,
  FaBehance,
  FaYoutube,
  FaVideo,
  FaPalette,
  FaMusic,
  FaFilm,
  FaMagic,
  FaFacebook,
  FaGlobe,
  FaStar,
  FaAward,
  FaLightbulb,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaQuoteLeft,
  FaArrowLeft, // Added for back button
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import for navigation

const AboutPageAdmin = () => {
  // Add navigation hook
  const navigate = useNavigate();

  // State management
  const [aboutPages, setAboutPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("agency");
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  // Form states
  const [agencyForm, setAgencyForm] = useState({
    name: "",
    tagline: "",
    description: "",
    foundedYear: new Date().getFullYear(),
    mission: "",
    vision: "",
    values: [""],
    heroImage: "",
    socialLinks: [{ platform: "linkedin", url: "", icon: "FaLinkedin" }],
    contactEmail: "",
    contactPhone: "",
    address: "",
    stats: [{ label: "", value: "", icon: "FaStar" }],
  });

  const [teamMembers, setTeamMembers] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [brandLogos, setBrandLogos] = useState([]);

  // Available platforms and icons
  const platforms = [
    "linkedin",
    "twitter",
    "instagram",
    "facebook",
    "youtube",
    "behance",
    "github",
    "website",
  ];
  const icons = [
    "FaLinkedin",
    "FaTwitter",
    "FaInstagram",
    "FaFacebook",
    "FaYoutube",
    "FaBehance",
    "FaGithub",
    "FaGlobe",
    "FaVideo",
    "FaPalette",
    "FaMusic",
    "FaFilm",
    "FaMagic",
    "FaEye",
    "FaStar",
    "FaAward",
    "FaTrophy",
    "FaLightbulb",
  ];

  // Fetch data on mount
  useEffect(() => {
    fetchAboutPages();
  }, []);

  // Load selected page data
  useEffect(() => {
    if (selectedPage) {
      setAgencyForm({
        ...selectedPage.agencyInfo,
        values: selectedPage.agencyInfo.values || [""],
        socialLinks: selectedPage.agencyInfo.socialLinks || [
          { platform: "linkedin", url: "", icon: "FaLinkedin" },
        ],
        stats: selectedPage.agencyInfo.stats || [
          { label: "", value: "", icon: "FaStar" },
        ],
      });
      setTeamMembers(selectedPage.teamMembers || []);
      setAchievements(selectedPage.achievements || []);
      setBrandLogos(selectedPage.brandLogos || []);
    }
  }, [selectedPage]);

  const fetchAboutPages = async () => {
    setLoading(true);
    try {
      const response = await getAllAboutPages();
      setAboutPages(response.data.aboutPages || []);
    } catch (error) {
      console.error("Error fetching about pages:", error);
      alert("Failed to load about pages");
    } finally {
      setLoading(false);
    }
  };

  // Image upload handler
  const handleImageUpload = async (e, setImageUrl) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const result = await uploadFile(file);
      setImageUrl(result.url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  // Agency Form Handlers
  const handleAgencyChange = (e) => {
    const { name, value } = e.target;
    setAgencyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleValueChange = (index, value) => {
    const newValues = [...agencyForm.values];
    newValues[index] = value;
    setAgencyForm((prev) => ({ ...prev, values: newValues }));
  };

  const addValueField = () => {
    setAgencyForm((prev) => ({ ...prev, values: [...prev.values, ""] }));
  };

  const removeValueField = (index) => {
    setAgencyForm((prev) => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index),
    }));
  };

  // Social Links Handlers
  const handleSocialLinkChange = (index, field, value) => {
    const newLinks = [...agencyForm.socialLinks];
    newLinks[index][field] = value;
    setAgencyForm((prev) => ({ ...prev, socialLinks: newLinks }));
  };

  const addSocialLink = () => {
    setAgencyForm((prev) => ({
      ...prev,
      socialLinks: [
        ...prev.socialLinks,
        { platform: "linkedin", url: "", icon: "FaLinkedin" },
      ],
    }));
  };

  const removeSocialLink = (index) => {
    setAgencyForm((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  // Stats Handlers
  const handleStatChange = (index, field, value) => {
    const newStats = [...agencyForm.stats];
    newStats[index][field] = value;
    setAgencyForm((prev) => ({ ...prev, stats: newStats }));
  };

  const addStat = () => {
    setAgencyForm((prev) => ({
      ...prev,
      stats: [...prev.stats, { label: "", value: "", icon: "FaStar" }],
    }));
  };

  const removeStat = (index) => {
    setAgencyForm((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }));
  };

  // Team Member Handlers
  const [teamMemberForm, setTeamMemberForm] = useState({
    name: "",
    role: "",
    front: {
      image: "",
      specialty: "",
      icon: "FaVideo",
    },
    back: {
      quote: "",
      bio: "",
      social: [{ platform: "linkedin", url: "" }],
    },
    order: 0,
    isActive: true,
  });

  const [editingTeamMember, setEditingTeamMember] = useState(null);

  // Team Member Social Links Handlers
  const handleTeamMemberSocialChange = (index, field, value) => {
    const newSocial = [...teamMemberForm.back.social];
    newSocial[index][field] = value;
    setTeamMemberForm((prev) => ({
      ...prev,
      back: {
        ...prev.back,
        social: newSocial,
      },
    }));
  };

  const addTeamMemberSocialLink = () => {
    setTeamMemberForm((prev) => ({
      ...prev,
      back: {
        ...prev.back,
        social: [...prev.back.social, { platform: "linkedin", url: "" }],
      },
    }));
  };

  const removeTeamMemberSocialLink = (index) => {
    setTeamMemberForm((prev) => ({
      ...prev,
      back: {
        ...prev.back,
        social: prev.back.social.filter((_, i) => i !== index),
      },
    }));
  };

  const handleTeamMemberSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPage) {
      alert("Please select or create an about page first");
      return;
    }

    try {
      if (editingTeamMember) {
        await updateTeamMember(
          selectedPage._id,
          editingTeamMember._id,
          teamMemberForm
        );
      } else {
        await addTeamMember(selectedPage._id, teamMemberForm);
      }
      await fetchAboutPages();
      resetTeamMemberForm();
      setEditingTeamMember(null);
    } catch (error) {
      console.error("Error saving team member:", error);
      alert("Failed to save team member");
    }
  };

  const editTeamMember = (member) => {
    setEditingTeamMember(member);
    setTeamMemberForm(member);
  };

  const deleteTeamMemberHandler = async (memberId) => {
    if (!selectedPage || !window.confirm("Delete this team member?")) return;

    try {
      await deleteTeamMember(selectedPage._id, memberId);
      await fetchAboutPages();
    } catch (error) {
      console.error("Error deleting team member:", error);
      alert("Failed to delete team member");
    }
  };

  const resetTeamMemberForm = () => {
    setTeamMemberForm({
      name: "",
      role: "",
      front: {
        image: "",
        specialty: "",
        icon: "FaVideo",
      },
      back: {
        quote: "",
        bio: "",
        social: [{ platform: "linkedin", url: "" }],
      },
      order: teamMembers.length,
      isActive: true,
    });
  };

  // Achievement Handlers
  const [achievementForm, setAchievementForm] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear().toString(),
    icon: "FaTrophy",
    image: "",
    order: 0,
    isActive: true,
  });

  const [editingAchievement, setEditingAchievement] = useState(null);

  const handleAchievementSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPage) {
      alert("Please select or create an about page first");
      return;
    }

    try {
      if (editingAchievement) {
        await updateAchievement(
          selectedPage._id,
          editingAchievement._id,
          achievementForm
        );
      } else {
        await addAchievement(selectedPage._id, achievementForm);
      }
      await fetchAboutPages();
      resetAchievementForm();
      setEditingAchievement(null);
    } catch (error) {
      console.error("Error saving achievement:", error);
      alert("Failed to save achievement");
    }
  };

  const editAchievement = (achievement) => {
    setEditingAchievement(achievement);
    setAchievementForm(achievement);
  };

  const deleteAchievementHandler = async (achievementId) => {
    if (!selectedPage || !window.confirm("Delete this achievement?")) return;

    try {
      await deleteAchievement(selectedPage._id, achievementId);
      await fetchAboutPages();
    } catch (error) {
      console.error("Error deleting achievement:", error);
      alert("Failed to delete achievement");
    }
  };

  const resetAchievementForm = () => {
    setAchievementForm({
      title: "",
      description: "",
      year: new Date().getFullYear().toString(),
      icon: "FaTrophy",
      image: "",
      order: achievements.length,
      isActive: true,
    });
  };

  // Brand Logo Handlers
  const [brandLogoForm, setBrandLogoForm] = useState({
    name: "",
    logo: "",
    website: "",
    order: 0,
    isActive: true,
  });

  const [editingBrandLogo, setEditingBrandLogo] = useState(null);

  const handleBrandLogoSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPage) {
      alert("Please select or create an about page first");
      return;
    }

    try {
      if (editingBrandLogo) {
        await updateBrandLogo(
          selectedPage._id,
          editingBrandLogo._id,
          brandLogoForm
        );
      } else {
        await addBrandLogo(selectedPage._id, brandLogoForm);
      }
      await fetchAboutPages();
      resetBrandLogoForm();
      setEditingBrandLogo(null);
    } catch (error) {
      console.error("Error saving brand logo:", error);
      alert("Failed to save brand logo");
    }
  };

  const editBrandLogo = (logo) => {
    setEditingBrandLogo(logo);
    setBrandLogoForm(logo);
  };

  const deleteBrandLogoHandler = async (logoId) => {
    if (!selectedPage || !window.confirm("Delete this brand logo?")) return;

    try {
      await deleteBrandLogo(selectedPage._id, logoId);
      await fetchAboutPages();
    } catch (error) {
      console.error("Error deleting brand logo:", error);
      alert("Failed to delete brand logo");
    }
  };

  const resetBrandLogoForm = () => {
    setBrandLogoForm({
      name: "",
      logo: "",
      website: "",
      order: brandLogos.length,
      isActive: true,
    });
  };

  // Main About Page CRUD
  const handleCreatePage = async () => {
    try {
      const newPage = {
        agencyInfo: agencyForm,
        teamMembers: [],
        achievements: [],
        brandLogos: [],
        isPublished: false,
      };

      const response = await createAboutPage(newPage);
      await fetchAboutPages();
      setSelectedPage(response.data.aboutPage);
      alert("About page created successfully!");
    } catch (error) {
      console.error("Error creating about page:", error);
      alert("Failed to create about page");
    }
  };

  const handleUpdatePage = async () => {
    if (!selectedPage) return;

    try {
      const updatedPage = {
        agencyInfo: agencyForm,
        teamMembers,
        achievements,
        brandLogos,
        isPublished: selectedPage.isPublished,
      };

      await updateAboutPage(selectedPage._id, updatedPage);
      await fetchAboutPages();
      alert("About page updated successfully!");
    } catch (error) {
      console.error("Error updating about page:", error);
      alert("Failed to update about page");
    }
  };

  const handleDeletePage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this about page?"))
      return;

    try {
      await deleteAboutPage(id);
      await fetchAboutPages();
      if (selectedPage && selectedPage._id === id) {
        setSelectedPage(null);
        resetForms();
      }
      alert("About page deleted successfully!");
    } catch (error) {
      console.error("Error deleting about page:", error);
      alert("Failed to delete about page");
    }
  };

  const togglePublish = async () => {
    if (!selectedPage) return;

    try {
      await updateAboutPage(selectedPage._id, {
        ...selectedPage,
        isPublished: !selectedPage.isPublished,
      });
      await fetchAboutPages();
      alert(
        `About page ${
          selectedPage.isPublished ? "unpublished" : "published"
        } successfully!`
      );
    } catch (error) {
      console.error("Error toggling publish:", error);
      alert("Failed to update publish status");
    }
  };

  const resetForms = () => {
    setAgencyForm({
      name: "",
      tagline: "",
      description: "",
      foundedYear: new Date().getFullYear(),
      mission: "",
      vision: "",
      values: [""],
      heroImage: "",
      socialLinks: [{ platform: "linkedin", url: "", icon: "FaLinkedin" }],
      contactEmail: "",
      contactPhone: "",
      address: "",
      stats: [{ label: "", value: "", icon: "FaStar" }],
    });
    setTeamMembers([]);
    setAchievements([]);
    setBrandLogos([]);
    resetTeamMemberForm();
    resetAchievementForm();
    resetBrandLogoForm();
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      FaLinkedin: FaLinkedin,
      FaTwitter: FaTwitter,
      FaInstagram: FaInstagram,
      FaGithub: FaGithub,
      FaBehance: FaBehance,
      FaYoutube: FaYoutube,
      FaVideo: FaVideo,
      FaPalette: FaPalette,
      FaMusic: FaMusic,
      FaFilm: FaFilm,
      FaMagic: FaMagic,
      FaEye: FaEye,
      FaFacebook: FaFacebook,
      FaGlobe: FaGlobe,
      FaStar: FaStar,
      FaAward: FaAward,
      FaTrophy: FaTrophy,
      FaLightbulb: FaLightbulb,
      FaChevronLeft: FaChevronLeft,
      FaChevronRight: FaChevronRight,
      FaPlay: FaPlay,
      FaPause: FaPause,
      FaQuoteLeft: FaQuoteLeft,
      FaPlus: FaPlus,
      FaEdit: FaEdit,
      FaTrash: FaTrash,
      FaSave: FaSave,
      FaTimes: FaTimes,
      FaUpload: FaUpload,
      FaEyeSlash: FaEyeSlash,
      FaSort: FaSort,
      FaArrowUp: FaArrowUp,
      FaArrowDown: FaArrowDown,
      FaUser: FaUser,
      FaBuilding: FaBuilding,
      FaImage: FaImage,
      FaArrowLeft: FaArrowLeft, // Added for back button
    };

    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent /> : <FaStar />;
  };

  // Filter about pages based on search
  const filteredPages = aboutPages.filter(
    (page) =>
      page.agencyInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.agencyInfo.tagline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort team members, achievements, and logos by order
  const sortedTeamMembers = [...teamMembers].sort((a, b) => a.order - b.order);
  const sortedAchievements = [...achievements].sort(
    (a, b) => a.order - b.order
  );
  const sortedBrandLogos = [...brandLogos].sort((a, b) => a.order - b.order);

  // Add back to dashboard function
  const handleBackToDashboard = () => {
    navigate("/dashboard"); // Adjust the route based on your dashboard route
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400"
              >
                <FaArrowLeft />
                Back to Dashboard
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  About Page Admin
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage your about page content
                </p>
              </div>
            </div>
            {/* Optional: Add other header actions here */}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - About Pages List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  About Pages
                </h2>
                <button
                  onClick={handleCreatePage}
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <FaPlus /> New Page
                </button>
              </div>

              {/* Search */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Pages List */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                  </div>
                ) : filteredPages.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No about pages found
                  </div>
                ) : (
                  filteredPages.map((page) => (
                    <div
                      key={page._id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedPage?._id === page._id
                          ? "border-teal-500 bg-teal-50"
                          : "border-gray-200 bg-white"
                      }`}
                      onClick={() => setSelectedPage(page)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {page.agencyInfo.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 truncate">
                            {page.agencyInfo.tagline}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                page.isPublished
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {page.isPublished ? "Published" : "Draft"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {page.teamMembers?.length || 0} team members
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePage(page._id);
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Editor */}
          <div className="lg:col-span-2">
            {selectedPage ? (
              <div className="bg-white rounded-xl shadow overflow-hidden">
                {/* Editor Header */}
                <div className="border-b border-gray-200 p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Editing: {selectedPage.agencyInfo.name}
                      </h2>
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={togglePublish}
                          className={`px-4 py-2 rounded-lg font-medium ${
                            selectedPage.isPublished
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                              : "bg-green-100 text-green-800 hover:bg-green-200"
                          }`}
                        >
                          {selectedPage.isPublished ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          onClick={handleUpdatePage}
                          className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
                        >
                          <FaSave /> Save Changes
                        </button>
                        <button
                          onClick={() => setPreviewMode(!previewMode)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                        >
                          {previewMode ? <FaEyeSlash /> : <FaEye />}
                          {previewMode ? "Hide Preview" : "Preview"}
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      Last updated:{" "}
                      {new Date(selectedPage.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-1 px-6">
                    {["agency", "team", "achievements", "brands"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-3 font-medium text-sm border-b-2 transition-all ${
                          activeTab === tab
                            ? "border-teal-500 text-teal-600"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {/* Agency Tab */}
                  {activeTab === "agency" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Agency Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={agencyForm.name}
                            onChange={handleAgencyChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="VisionCraft"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tagline *
                          </label>
                          <input
                            type="text"
                            name="tagline"
                            value={agencyForm.tagline}
                            onChange={handleAgencyChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="We Craft Visual Stories"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description *
                        </label>
                        <textarea
                          name="description"
                          value={agencyForm.description}
                          onChange={handleAgencyChange}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Tell your agency's story..."
                          required
                        />
                      </div>

                      {/* Hero Image Upload */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hero Image
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={agencyForm.heroImage}
                              onChange={(e) =>
                                setAgencyForm((prev) => ({
                                  ...prev,
                                  heroImage: e.target.value,
                                }))
                              }
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              placeholder="Image URL"
                            />
                          </div>
                          <div>
                            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg border border-gray-300 flex items-center gap-2">
                              <FaUpload />
                              Upload
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleImageUpload(e, (url) =>
                                    setAgencyForm((prev) => ({
                                      ...prev,
                                      heroImage: url,
                                    }))
                                  )
                                }
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                        {agencyForm.heroImage && (
                          <div className="mt-3">
                            <img
                              src={agencyForm.heroImage}
                              alt="Hero preview"
                              className="h-48 w-full object-cover rounded-lg"
                            />
                          </div>
                        )}
                      </div>

                      {/* Values Section */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Values
                          </label>
                          <button
                            type="button"
                            onClick={addValueField}
                            className="text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1"
                          >
                            <FaPlus /> Add Value
                          </button>
                        </div>
                        {agencyForm.values.map((value, index) => (
                          <div key={index} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              value={value}
                              onChange={(e) =>
                                handleValueChange(index, e.target.value)
                              }
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              placeholder="Innovation-First Approach"
                            />
                            {agencyForm.values.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeValueField(index)}
                                className="px-3 text-red-500 hover:text-red-700"
                              >
                                <FaTimes />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Social Links */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Social Links
                          </label>
                          <button
                            type="button"
                            onClick={addSocialLink}
                            className="text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1"
                          >
                            <FaPlus /> Add Link
                          </button>
                        </div>
                        {agencyForm.socialLinks.map((link, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3"
                          >
                            <select
                              value={link.platform}
                              onChange={(e) =>
                                handleSocialLinkChange(
                                  index,
                                  "platform",
                                  e.target.value
                                )
                              }
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            >
                              {platforms.map((platform) => (
                                <option key={platform} value={platform}>
                                  {platform.charAt(0).toUpperCase() +
                                    platform.slice(1)}
                                </option>
                              ))}
                            </select>
                            <input
                              type="text"
                              value={link.url}
                              onChange={(e) =>
                                handleSocialLinkChange(
                                  index,
                                  "url",
                                  e.target.value
                                )
                              }
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              placeholder="https://..."
                            />
                            <div className="flex gap-2">
                              <select
                                value={link.icon}
                                onChange={(e) =>
                                  handleSocialLinkChange(
                                    index,
                                    "icon",
                                    e.target.value
                                  )
                                }
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              >
                                {icons.map((icon) => (
                                  <option key={icon} value={icon}>
                                    {icon}
                                  </option>
                                ))}
                              </select>
                              {agencyForm.socialLinks.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeSocialLink(index)}
                                  className="px-3 text-red-500 hover:text-red-700"
                                >
                                  <FaTimes />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Stats */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Statistics
                          </label>
                          <button
                            type="button"
                            onClick={addStat}
                            className="text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1"
                          >
                            <FaPlus /> Add Stat
                          </button>
                        </div>
                        {agencyForm.stats.map((stat, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3"
                          >
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) =>
                                handleStatChange(index, "label", e.target.value)
                              }
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              placeholder="Projects Completed"
                            />
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) =>
                                handleStatChange(index, "value", e.target.value)
                              }
                              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              placeholder="500+"
                            />
                            <div className="flex gap-2">
                              <select
                                value={stat.icon}
                                onChange={(e) =>
                                  handleStatChange(
                                    index,
                                    "icon",
                                    e.target.value
                                  )
                                }
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              >
                                {icons.map((icon) => (
                                  <option key={icon} value={icon}>
                                    {icon}
                                  </option>
                                ))}
                              </select>
                              {agencyForm.stats.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeStat(index)}
                                  className="px-3 text-red-500 hover:text-red-700"
                                >
                                  <FaTimes />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Team Members Tab */}
                  {activeTab === "team" && (
                    <div className="space-y-6">
                      {/* Team Member Form */}
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {editingTeamMember
                            ? "Edit Team Member"
                            : "Add New Team Member"}
                        </h3>
                        <form
                          onSubmit={handleTeamMemberSubmit}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name *
                              </label>
                              <input
                                type="text"
                                value={teamMemberForm.name}
                                onChange={(e) =>
                                  setTeamMemberForm((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                  }))
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role *
                              </label>
                              <input
                                type="text"
                                value={teamMemberForm.role}
                                onChange={(e) =>
                                  setTeamMemberForm((prev) => ({
                                    ...prev,
                                    role: e.target.value,
                                  }))
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Specialty
                              </label>
                              <input
                                type="text"
                                value={teamMemberForm.front.specialty}
                                onChange={(e) =>
                                  setTeamMemberForm((prev) => ({
                                    ...prev,
                                    front: {
                                      ...prev.front,
                                      specialty: e.target.value,
                                    },
                                  }))
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Icon
                              </label>
                              <select
                                value={teamMemberForm.front.icon}
                                onChange={(e) =>
                                  setTeamMemberForm((prev) => ({
                                    ...prev,
                                    front: {
                                      ...prev.front,
                                      icon: e.target.value,
                                    },
                                  }))
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              >
                                {icons.map((icon) => (
                                  <option key={icon} value={icon}>
                                    {icon}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Image URL *
                            </label>
                            <div className="flex items-center gap-4">
                              <input
                                type="text"
                                value={teamMemberForm.front.image}
                                onChange={(e) =>
                                  setTeamMemberForm((prev) => ({
                                    ...prev,
                                    front: {
                                      ...prev.front,
                                      image: e.target.value,
                                    },
                                  }))
                                }
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                required
                              />
                              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg border border-gray-300 flex items-center gap-2">
                                <FaUpload />
                                Upload
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleImageUpload(e, (url) =>
                                      setTeamMemberForm((prev) => ({
                                        ...prev,
                                        front: { ...prev.front, image: url },
                                      }))
                                    )
                                  }
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Quote
                            </label>
                            <textarea
                              value={teamMemberForm.back.quote}
                              onChange={(e) =>
                                setTeamMemberForm((prev) => ({
                                  ...prev,
                                  back: { ...prev.back, quote: e.target.value },
                                }))
                              }
                              rows={2}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Bio *
                            </label>
                            <textarea
                              value={teamMemberForm.back.bio}
                              onChange={(e) =>
                                setTeamMemberForm((prev) => ({
                                  ...prev,
                                  back: { ...prev.back, bio: e.target.value },
                                }))
                              }
                              rows={3}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              required
                            />
                          </div>

                          {/* Social Links for Team Member */}
                          <div>
                            <div className="flex justify-between items-center mb-3">
                              <label className="block text-sm font-medium text-gray-700">
                                Social Links
                              </label>
                              <button
                                type="button"
                                onClick={addTeamMemberSocialLink}
                                className="text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1"
                              >
                                <FaPlus /> Add Social Link
                              </button>
                            </div>
                            <div className="space-y-2">
                              {teamMemberForm.back.social.map(
                                (social, index) => (
                                  <div key={index} className="flex gap-2">
                                    <select
                                      value={social.platform}
                                      onChange={(e) =>
                                        handleTeamMemberSocialChange(
                                          index,
                                          "platform",
                                          e.target.value
                                        )
                                      }
                                      className="w-1/3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                    >
                                      {platforms.map((platform) => (
                                        <option key={platform} value={platform}>
                                          {platform.charAt(0).toUpperCase() +
                                            platform.slice(1)}
                                        </option>
                                      ))}
                                    </select>
                                    <input
                                      type="text"
                                      value={social.url}
                                      onChange={(e) =>
                                        handleTeamMemberSocialChange(
                                          index,
                                          "url",
                                          e.target.value
                                        )
                                      }
                                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                      placeholder="https://..."
                                    />
                                    {teamMemberForm.back.social.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          removeTeamMemberSocialLink(index)
                                        }
                                        className="px-3 text-red-500 hover:text-red-700"
                                      >
                                        <FaTimes />
                                      </button>
                                    )}
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          {/* Active Status */}
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id="teamMemberActive"
                              checked={teamMemberForm.isActive}
                              onChange={(e) =>
                                setTeamMemberForm((prev) => ({
                                  ...prev,
                                  isActive: e.target.checked,
                                }))
                              }
                              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                            />
                            <label
                              htmlFor="teamMemberActive"
                              className="text-sm text-gray-700"
                            >
                              Active (visible on the website)
                            </label>
                          </div>

                          <div className="flex gap-4">
                            <button
                              type="submit"
                              className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
                            >
                              {editingTeamMember ? "Update" : "Add"} Team Member
                            </button>
                            {editingTeamMember && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingTeamMember(null);
                                  resetTeamMemberForm();
                                }}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      {/* Team Members List */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Team Members ({sortedTeamMembers.length})
                        </h3>
                        <div className="space-y-3">
                          {sortedTeamMembers.map((member) => (
                            <div
                              key={member._id}
                              className="bg-white border border-gray-200 rounded-lg p-4"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <img
                                    src={member.front.image}
                                    alt={member.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                  />
                                  <div>
                                    <h4 className="font-semibold text-gray-900">
                                      {member.name}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                      {member.role}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {member.front.specialty}
                                    </p>
                                    <div className="flex gap-2 mt-1">
                                      {member.back.social &&
                                        member.back.social.map(
                                          (social, idx) => (
                                            <span
                                              key={idx}
                                              className="text-xs px-2 py-1 bg-gray-100 rounded"
                                            >
                                              {social.platform}
                                            </span>
                                          )
                                        )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => editTeamMember(member)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    onClick={() =>
                                      deleteTeamMemberHandler(member._id)
                                    }
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Achievements Tab */}
                  {activeTab === "achievements" && (
                    <div className="space-y-6">
                      {/* Achievement Form */}
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {editingAchievement
                            ? "Edit Achievement"
                            : "Add New Achievement"}
                        </h3>
                        <form
                          onSubmit={handleAchievementSubmit}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Title *
                              </label>
                              <input
                                type="text"
                                value={achievementForm.title}
                                onChange={(e) =>
                                  setAchievementForm((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                  }))
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Year *
                              </label>
                              <input
                                type="text"
                                value={achievementForm.year}
                                onChange={(e) =>
                                  setAchievementForm((prev) => ({
                                    ...prev,
                                    year: e.target.value,
                                  }))
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Description *
                            </label>
                            <textarea
                              value={achievementForm.description}
                              onChange={(e) =>
                                setAchievementForm((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                              rows={3}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Icon
                              </label>
                              <select
                                value={achievementForm.icon}
                                onChange={(e) =>
                                  setAchievementForm((prev) => ({
                                    ...prev,
                                    icon: e.target.value,
                                  }))
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                              >
                                {icons.map((icon) => (
                                  <option key={icon} value={icon}>
                                    {icon}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Image URL *
                              </label>
                              <div className="flex items-center gap-4">
                                <input
                                  type="text"
                                  value={achievementForm.image}
                                  onChange={(e) =>
                                    setAchievementForm((prev) => ({
                                      ...prev,
                                      image: e.target.value,
                                    }))
                                  }
                                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                  required
                                />
                                <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg border border-gray-300 flex items-center gap-2">
                                  <FaUpload />
                                  Upload
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageUpload(e, (url) =>
                                        setAchievementForm((prev) => ({
                                          ...prev,
                                          image: url,
                                        }))
                                      )
                                    }
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Active Status for Achievement */}
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id="achievementActive"
                              checked={achievementForm.isActive}
                              onChange={(e) =>
                                setAchievementForm((prev) => ({
                                  ...prev,
                                  isActive: e.target.checked,
                                }))
                              }
                              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                            />
                            <label
                              htmlFor="achievementActive"
                              className="text-sm text-gray-700"
                            >
                              Active (visible on the website)
                            </label>
                          </div>

                          <div className="flex gap-4">
                            <button
                              type="submit"
                              className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
                            >
                              {editingAchievement ? "Update" : "Add"}{" "}
                              Achievement
                            </button>
                            {editingAchievement && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingAchievement(null);
                                  resetAchievementForm();
                                }}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      {/* Achievements List */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Achievements ({sortedAchievements.length})
                        </h3>
                        <div className="space-y-3">
                          {sortedAchievements.map((achievement) => (
                            <div
                              key={achievement._id}
                              className="bg-white border border-gray-200 rounded-lg p-4"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                                    <span className="text-teal-600 text-xl">
                                      {getIconComponent(achievement.icon)}
                                    </span>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-900">
                                      {achievement.title}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                      {achievement.year}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate max-w-md">
                                      {achievement.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => editAchievement(achievement)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    onClick={() =>
                                      deleteAchievementHandler(achievement._id)
                                    }
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Brands Tab */}
                  {activeTab === "brands" && (
                    <div className="space-y-6">
                      {/* Brand Logo Form */}
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {editingBrandLogo
                            ? "Edit Brand Logo"
                            : "Add New Brand Logo"}
                        </h3>
                        <form
                          onSubmit={handleBrandLogoSubmit}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Brand Name *
                              </label>
                              <input
                                type="text"
                                value={brandLogoForm.name}
                                onChange={(e) =>
                                  setBrandLogoForm((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                  }))
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Website
                              </label>
                              <input
                                type="text"
                                value={brandLogoForm.website}
                                onChange={(e) =>
                                  setBrandLogoForm((prev) => ({
                                    ...prev,
                                    website: e.target.value,
                                  }))
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="https://..."
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Logo URL *
                            </label>
                            <div className="flex items-center gap-4">
                              <input
                                type="text"
                                value={brandLogoForm.logo}
                                onChange={(e) =>
                                  setBrandLogoForm((prev) => ({
                                    ...prev,
                                    logo: e.target.value,
                                  }))
                                }
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                required
                              />
                              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg border border-gray-300 flex items-center gap-2">
                                <FaUpload />
                                Upload
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleImageUpload(e, (url) =>
                                      setBrandLogoForm((prev) => ({
                                        ...prev,
                                        logo: url,
                                      }))
                                    )
                                  }
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>

                          {/* Active Status for Brand Logo */}
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id="brandLogoActive"
                              checked={brandLogoForm.isActive}
                              onChange={(e) =>
                                setBrandLogoForm((prev) => ({
                                  ...prev,
                                  isActive: e.target.checked,
                                }))
                              }
                              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                            />
                            <label
                              htmlFor="brandLogoActive"
                              className="text-sm text-gray-700"
                            >
                              Active (visible on the website)
                            </label>
                          </div>

                          <div className="flex gap-4">
                            <button
                              type="submit"
                              className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
                            >
                              {editingBrandLogo ? "Update" : "Add"} Brand Logo
                            </button>
                            {editingBrandLogo && (
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingBrandLogo(null);
                                  resetBrandLogoForm();
                                }}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </form>
                      </div>

                      {/* Brand Logos List */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Brand Logos ({sortedBrandLogos.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {sortedBrandLogos.map((logo) => (
                            <div
                              key={logo._id}
                              className="bg-white border border-gray-200 rounded-lg p-4"
                            >
                              <div className="flex flex-col items-center">
                                <div className="w-32 h-20 mb-3 bg-gray-100 rounded-lg flex items-center justify-center p-2">
                                  <img
                                    src={logo.logo}
                                    alt={logo.name}
                                    className="max-w-full max-h-full object-contain"
                                  />
                                </div>
                                <h4 className="font-semibold text-gray-900 text-center mb-1">
                                  {logo.name}
                                </h4>
                                {logo.website && (
                                  <p className="text-sm text-gray-600 text-center truncate w-full">
                                    {logo.website}
                                  </p>
                                )}
                                <div className="flex gap-2 mt-3">
                                  <button
                                    onClick={() => editBrandLogo(logo)}
                                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() =>
                                      deleteBrandLogoHandler(logo._id)
                                    }
                                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-xl shadow p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaBuilding className="w-12 h-12 text-teal-500" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  No About Page Selected
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Select an existing about page from the list or create a new
                  one to start editing
                </p>
                <button
                  onClick={handleCreatePage}
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all inline-flex items-center gap-2"
                >
                  <FaPlus /> Create New About Page
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Preview Modal */}
        {previewMode && selectedPage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">Preview</h3>
                <button
                  onClick={() => setPreviewMode(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <FaTimes className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="p-6">
                {/* Render the AboutUs component here with preview data */}
                <div className="space-y-6">
                  {/* Hero Section Preview */}
                  <div className="text-center p-8 bg-gradient-to-br from-teal-50 via-white to-emerald-50/30 rounded-xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                      {agencyForm.tagline}
                    </h1>
                    <p className="text-gray-600 text-lg">
                      {agencyForm.mission}
                    </p>
                  </div>

                  {/* Team Members Preview */}
                  {teamMembers.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Team Preview
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {teamMembers.slice(0, 3).map((member) => (
                          <div
                            key={member._id}
                            className="bg-white border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={member.front.image}
                                alt={member.name}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {member.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {member.role}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements Preview */}
                  {achievements.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Achievements Preview
                      </h3>
                      <div className="space-y-3">
                        {achievements.slice(0, 3).map((achievement) => (
                          <div
                            key={achievement._id}
                            className="bg-white border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                                <span className="text-teal-600 text-xl">
                                  {getIconComponent(achievement.icon)}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {achievement.title}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {achievement.year}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Brand Logos Preview */}
                  {brandLogos.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Brand Logos Preview
                      </h3>
                      <div className="flex flex-wrap gap-4">
                        {brandLogos.slice(0, 6).map((logo) => (
                          <div
                            key={logo._id}
                            className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center p-2"
                          >
                            <img
                              src={logo.logo}
                              alt={logo.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPageAdmin;
