"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import imageCompression from "browser-image-compression";

export default function UserDropdown() {
  const router =
    useRouter();

  const [
    user,
    setUser,
  ] = useState<any>();

  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    showProfileModal,
    setShowProfileModal,
  ] = useState(false);

  const [
    profileName,
    setProfileName,
  ] = useState("");

  const [
    avatar,
    setAvatar,
  ] = useState("");

  const [
    uploading,
    setUploading,
  ] = useState(false);

  const [
    saving,
    setSaving,
  ] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (
      !token ||
      token === "null" ||
      token === "undefined"
    ) {
      router.push("/login");
      return;
    }

    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await fetch(
          "/api/profile",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data =
        await res.json();

      if (
        !res.ok ||
        data.error
      ) {
        localStorage.removeItem(
          "token"
        );

        router.push("/login");

        return;
      }

      setUser(data);

      setProfileName(
        data.name || ""
      );

      setAvatar(
        data.avatar || ""
      );

    } catch (error) {
      console.error(error);
    }
  }

  async function handleAvatarUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    try {
      const file =
        e.target.files?.[0];

      if (!file) return;

      setUploading(true);

      const compressed =
        await imageCompression(
          file,
          {
            maxSizeMB: 0.3,

            maxWidthOrHeight:
              512,

            useWebWorker:
              true,

            fileType:
              "image/webp",
          }
        );

      const formData =
        new FormData();

      formData.append(
        "file",
        compressed
      );

      const res =
        await fetch(
          "/api/upload-avatar",
          {
            method: "POST",

            body: formData,
          }
        );

      const data =
        await res.json();

      if (!res.ok) {
        alert(
          data.error ||
            "Upload failed"
        );

        return;
      }

      setAvatar(
        data.url
      );

    } catch (error) {
      console.error(error);

      alert(
        "Upload failed"
      );

    } finally {
      setUploading(false);
    }
  }

  async function saveProfile() {
    try {
      setSaving(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await fetch(
          "/api/profile",
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              name:
                profileName,

              avatar,
            }),
          }
        );

      const data =
        await res.json();

      if (!res.ok) {
        alert(
          data.error ||
            "Update failed"
        );

        return;
      }

      await fetchProfile();

      setShowProfileModal(
        false
      );

      alert(
        "Profile updated"
      );

    } catch (error) {
      console.error(error);

      alert(
        "Update failed"
      );

    } finally {
      setSaving(false);
    }
  }

  function logout() {
    localStorage.removeItem(
      "token"
    );

    router.push(
      "/login"
    );
  }

  if (
    !user || 
    !user.name
  ) {
    return null;
  }

  return (
    <>
      <div
        className="
          relative
          z-[9999]
        "
      >
        <button
          onClick={() =>
            setOpen(!open)
          }
          className="
            flex
            items-center
            gap-3

            px-3
            py-2

            rounded-full

            border
            border-white/10

            bg-white/[0.03]

            hover:border-violet-500/20

            transition
          "
        >
          <div
            className="
              text-right
              hidden
              md:block
            "
          >
            <p
              className="
                text-sm
                text-white
              "
            >
              {user.name}
            </p>

            <p
              className="
                text-[11px]
                uppercase
                tracking-wider
                text-white/40
              "
            >
              {user.role}
            </p>
          </div>

          {user.avatar ? (
            <img
              src={user.avatar}
              alt=""
              className="
                w-10
                h-10
                rounded-full
                border
                border-white/10
                object-cover
              "
            />
          ) : (
            <div
              className="
                w-10
                h-10

                rounded-full

                bg-gradient-to-br
                from-violet-500
                to-orange-400

                flex
                items-center
                justify-center

                text-sm

                shadow-lg
                shadow-violet-500/20
              "
            >
              {user.name[0] || "U"}
            </div>
          )}

          <span
            className="
              text-xs
              text-white/40
            "
          >
            {open
              ? "▲"
              : "▼"}
          </span>
        </button>

        {open && (
          <div
            className="
              absolute
              right-0
              top-full
              mt-2

              w-56

              rounded-2xl

              border
              border-white/10

              bg-[#16181d]

              shadow-2xl
              shadow-black/50

              overflow-hidden

              z-[9999]
            "
          >
            <button
              onClick={() => {
                setOpen(false);

                setShowProfileModal(
                  true
                );
              }}
              className="
                w-full

                px-5
                py-4

                text-left
                text-sm
                text-white/70

                hover:bg-white/[0.03]
                hover:text-white

                transition
              "
            >
              Change Profile
            </button>

            <div
              className="
                h-px
                bg-white/10
              "
            />

            <button
              onClick={logout}
              className="
                w-full

                px-5
                py-4

                text-left
                text-sm
                text-red-400

                hover:bg-red-500/10

                transition
              "
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {showProfileModal && (
        <div
          className="
            absolute
            right-0
            top-[calc(100%+12px)]

            w-[380px]

            border
            border-white/10

            bg-[#16181d]

            rounded-[28px]

            shadow-2xl
            shadow-black/50

            p-6

            z-[99999]
          "
        >
            <h2
              className="
                text-2xl
                text-white
                mb-8
              "
            >
              Change Profile
            </h2>

            <div
              className="
                flex
                flex-col
                items-center
                mb-8
              "
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt=""
                  className="
                    w-24
                    h-24

                    rounded-full

                    object-cover

                    border
                    border-white/10

                    mb-4
                  "
                />
              ) : (
                <div
                  className="
                    w-24
                    h-24

                    rounded-full

                    bg-gradient-to-br
                    from-violet-500
                    to-orange-400

                    flex
                    items-center
                    justify-center

                    text-2xl

                    mb-4
                  "
                >
                  {profileName?.[0] || "U"}
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={
                  handleAvatarUpload
                }
                className="
                  text-xs
                  text-white/60
                "
              />

              {uploading && (
                <p
                  className="
                    text-xs
                    text-orange-300
                    mt-2
                  "
                >
                  Uploading...
                </p>
              )}
            </div>

            <div
              className="
                mb-6
              "
            >
              <label
                className="
                  text-xs
                  text-white/50
                  block
                  mb-2
                "
              >
                Name
              </label>

              <input
                value={profileName}
                onChange={(e) =>
                  setProfileName(
                    e.target.value
                  )
                }
                className="
                  w-full
                  h-12

                  rounded-2xl

                  bg-white/[0.03]

                  border
                  border-white/10

                  px-4

                  text-white

                  outline-none
                "
              />
            </div>

            <div
              className="
                flex
                gap-3
              "
            >
              <button
                onClick={() =>
                  setShowProfileModal(
                    false
                  )
                }
                className="
                  flex-1
                  h-12

                  rounded-2xl

                  border
                  border-white/10

                  text-white/60
                "
              >
                Cancel
              </button>

              <button
                onClick={
                  saveProfile
                }
                disabled={
                  saving
                }
                className="
                  flex-1
                  h-12

                  rounded-2xl

                  bg-gradient-to-r
                  from-violet-500
                  to-orange-400

                  text-white
                "
              >
                {saving
                  ? "Saving..."
                  : "Save"}
              </button>
            </div>
          </div>
      )}
    </>
  );
}