// app/components/LazyComponent.tsx
export default function LazyComponent() {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700">
        I am a Lazy Loaded Component!
      </h2>
      <p className="text-gray-500 mt-2">
        This component was loaded dynamically after the button was clicked.
      </p>
    </div>
  );
}
